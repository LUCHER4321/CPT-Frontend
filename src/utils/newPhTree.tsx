import { useNavigate } from "react-router-dom";
import { createTree, myTreesCount } from "../api/phTree";
import { getMe } from "../api/user";
import { plans } from "../data/prices";

export const newPhTree = (history = useNavigate()) => async () => {
    const { myTrees } = await myTreesCount({}) ?? {};
    const { plan } = await getMe({}) ?? {};
    if(!plan || myTrees === undefined) return console.log({ plan, myTrees });
    if(myTrees >= (plans.get(plan)?.constraints.maxTrees ?? Number.MAX_SAFE_INTEGER)) throw new Error("Maximum number of Phylogenetic Trees");
    const { id } = await createTree({
        name: "Untitled Phylogenetic Tree",
        isPublic: false
    }) ?? {};
    console.log({ id })
    if(id) await history(`/account/trees/${id}`);
}