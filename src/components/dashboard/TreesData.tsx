import { useNavigate } from "react-router-dom";
import { title } from "../../data/classNames"
import { Card } from "../home/Card"
import { createTree } from "../../api/phTree";

interface TreesDataProps {
    trees?: number;
    myTrees?: number;
    collabs?: number;
}

export const TreesData = ({
    trees,
    myTrees,
    collabs
}: TreesDataProps) => {
    const history = useNavigate();
    return(
        <>
            <h2 className={"col-span-full text-[2rem] mb-2 " + title}>Trees Data</h2>
            {(trees ?? 0) > 0 ? <>
                <Card
                    fa="fa-project-diagram"
                    title={trees?.toString()}
                    description="Total Trees"
                    href="/account/trees"
                />
                <Card
                    fa="fa-user"
                    title={myTrees?.toString()}
                    description="My Trees"
                    href="/account/trees/me"
                />
                {(collabs ?? 0) > 0 ? <Card
                    fa="fa-users"
                    title={collabs?.toString()}
                    description="Collaborations"
                    href="/account/collabs"
                /> : <div className="hidden sm:block"/>}
            </> : <>
                <div className="hidden sm:block"/>
                <Card
                    fa="fa-plus"
                    description="New Tree"
                    onClick={() => createTree({
                        name: "Untitled Phylogenetic Tree",
                        isPublic: false
                    }).then(t => {
                        if(t) history(`/account/tree${t.id}`);
                    })}
                />
                <div className="hidden sm:block"/>
            </>}
        </>
    )
}