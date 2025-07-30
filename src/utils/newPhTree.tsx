import { useNavigate } from "react-router-dom";
import { createTree, getMyTrees, myTreesCount } from "../api/phTree";
import { getMe } from "../api/user";
import { plans } from "../data/prices";
import { nullableInput } from "./nullableInput";

export const newPhTree = async (defaultName = "Untitled Phylogenetic Tree") => {
    const { myTrees } = await myTreesCount({}) ?? {};
    const { plan } = await getMe({}) ?? {};
    if((myTrees ?? 0) >= (nullableInput(plan, plans.get)?.constraints.maxTrees ?? Number.MAX_SAFE_INTEGER)) throw new Error("Maximum number of Phylogenetic Trees")
    const history = useNavigate();
    let name = defaultName;
    let n = 0;
    if((await getMyTrees({ search: defaultName }))?.map(t => t.name).includes(defaultName)) {
        do{
            n++;
            name = `${defaultName} (${n})`;
        }
        while((await getMyTrees({ search: name }))?.map(t => t.name).includes(name));
    }
    const { id } = await createTree({
        name,
        isPublic: false
    }) ?? {};
    await history(`/trees/${id}`);
}