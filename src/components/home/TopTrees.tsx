import { title } from "../../data/classNames";
import type { PhTreeResponse } from "../../types";
import { TreeCard } from "./TreeCard";

interface TopTreesProps {
    id?: string;
    trees?: (PhTreeResponse & { username: string; })[]
}

export const TopTrees = ({
    id,
    trees = []
}: TopTreesProps) => {
    return (
        <section id={id} className="text-center p-16">
            <h2 className={"text-[2rem] mb-12 " + title}>Featured Trees</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {trees.map((t, index) => (<TreeCard tree={t} key={index}/>))}
            </div>
        </section>
    )
};