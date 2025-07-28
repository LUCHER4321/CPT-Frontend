import { card, title } from "../../data/classNames";
import type { PhTreeResponse } from "../../types";

interface TreeCardProps {
    tree: PhTreeResponse & { username: string; };
}

export const TreeCard = ({
    tree: {
        id,
        image,
        name,
        username,
        likes,
        comments
    }
}: TreeCardProps) => {
    return (
        <a className={card + " " + title} href={`/trees/${id}`}>
            <img src={image}/>
            <h3 className={"text-start px-4 pt-4 text-[1.17em] " + title}>{name}</h3>
            <p className="text-start px-4 ">By: @{username}</p>
            <div className="flex justify-between flex-row w-full p-4">
                <div className="flex flex-row items-center space-x-1">
                    <i className="fas fa-heart"/>
                    <p>{likes}</p>
                </div>
                <div className="flex flex-row items-center space-x-1">
                    <i className="fas fa-comment"/>
                    <p>{comments}</p>
                </div>
            </div>
        </a>
    )
};