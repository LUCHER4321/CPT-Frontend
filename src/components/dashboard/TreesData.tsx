import { title } from "../../data/classNames"
import { Card } from "../home/Card"

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
    return(
        <>
            <h2 className={"col-span-full text-[2rem] mb-2 " + title}>Trees Data</h2>
            {(trees ?? 0) > 0 ? <>
                <Card
                    fa="fa-project-diagram"
                    title={trees?.toString()}
                    description={trees ? "Total Trees" : "New Tree"}
                    href="/account/trees"
                />
                <Card
                    fa="fa-user"
                    title={myTrees?.toString()}
                    description={myTrees ? "My Trees" : "New Tree"}
                    href="/account/trees/me"
                />
                <Card
                    fa="fa-users"
                    title={collabs?.toString()}
                    description={collabs ? "Collaborations" : "New Tree"}
                    href="/account/collabs"
                />
            </> : <>
                <div className="hidden sm:block"/>
                <Card
                    fa="fa-plus"
                    description="New Tree"
                    href="/account/trees"
                />
                <div className="hidden sm:block"/>
            </>}
        </>
    )
}