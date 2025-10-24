import { useNavigate } from "react-router-dom";
import { createTree, myTreesCount } from "../api/phTree";
import { getMe } from "../api/user";
import { plans } from "../data/prices";
import { NotiFunc } from "../enums";
import { notificationService } from "../classes/NotificationService";

export const newPhTree = (history = useNavigate()) => async () => {
    const { myTrees } = await myTreesCount({}) ?? {};
    const { plan } = await getMe({}) ?? {};
    if(!plan || myTrees === undefined) return;
    if(myTrees >= (plans.get(plan)?.constraints.maxTrees ?? Number.MAX_SAFE_INTEGER)) return alert("Maximum number of Phylogenetic Trees");
    const name = prompt("Enter the name of your new Phylogenetic Tree", "Untitled Phylogenetic Tree");
    if (!name) return;
    const { id } = await createTree({
        name,
        isPublic: true
    }) ?? {};
    notificationService.emit({
        fun: NotiFunc.TREE,
        treeId: id
    })
    if(id) await history(`/account/trees/${id}`);
}