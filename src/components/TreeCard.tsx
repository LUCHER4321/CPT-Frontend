import { card, title } from "../data/classNames";
import type { PhTreeResponse } from "../types";

interface TreeCardProps {
    tree: PhTreeResponse & { username: string; };
}

export const TreeCard = ({
    tree
}: TreeCardProps) => {
    return (
        <div className={card}>
            <img src={tree.image}/>
            <h3 className={"text-start px-4 pt-4 text-[1.17em] " + title}>{tree.name}</h3>
            <p className="text-start px-4 ">By: @{tree.username}</p>
            <div className="flex justify-between flex-row w-full p-4">
                <div className="flex flex-row">
                    <i className="fas fa-heart"/>
                    {tree.likes}
                </div>
                <div className="flex flex-row">
                    <i className="fas fa-comment"/>
                    {tree.comments}
                </div>
            </div>
        </div>
    )
};