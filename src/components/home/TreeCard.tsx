import { card, circleImage, title } from "../../data/classNames";
import type { PhTreeResponse } from "../../types";

interface TreeCardProps {
    tree?: PhTreeResponse & { username: string; };
}

export const TreeCard = ({
    tree
}: TreeCardProps) => {
    const { id, image, name, username, likes, comments } = tree ?? {};
    return (
        <a className={card + " " + title} href={`/trees/${id}`}>
            <div className="flex flex-row justify-between p-4 items-center">
                <div className="flex flex-col">
                    <h3 className={"text-start text-[1.17em] " + title}>{name}</h3>
                    <p className="text-start">By: @{username}</p>
                </div>
                <img src={image} className={"h-10! w-10! " + circleImage}/>
            </div>
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