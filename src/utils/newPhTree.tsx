import { useNavigate } from "react-router-dom";
import { createTree, myTreesCount } from "../api/phTree";
import { getMe } from "../api/user";
import { plans } from "../data/prices";
import type { NotificationWS } from "../classes/NotificationWS";
import { NotiFunc } from "../enums";

export const newPhTree = (notificationWS?: NotificationWS, history = useNavigate()) => async () => {
    const { myTrees } = await myTreesCount({}) ?? {};
    const { plan } = await getMe({}) ?? {};
    if(!plan || myTrees === undefined) return;
    if(myTrees >= (plans.get(plan)?.constraints.maxTrees ?? Number.MAX_SAFE_INTEGER)) throw new Error("Maximum number of Phylogenetic Trees");
    const { id } = await createTree({
        name: "Untitled Phylogenetic Tree",
        isPublic: false
    }) ?? {};
    notificationWS?.emit({
        fun: NotiFunc.TREE,
        treeId: id
    })
    if(id) await history(`/account/trees/${id}`);
}