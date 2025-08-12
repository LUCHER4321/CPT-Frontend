import { title } from "../../data/classNames";
import type { PhTreeResponse } from "../../types";
import { TreeCard } from "../home/TreeCard";

interface LastTreesProps {
    lastTrees?: (PhTreeResponse & { username: string })[]
}

export const LastTrees = ({
    lastTrees = []
}: LastTreesProps) => {
    return (
        <>
            <h2 className={"col-span-full text-[2rem] mb-2 " + title}>Last Trees</h2>
            {lastTrees.map((tree, index) => (
                <TreeCard
                    tree={tree}
                    key={index}
                    edit
                />
            ))}
        </>
    )
};