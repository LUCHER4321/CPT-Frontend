import { card, circleImage, title } from "../../data/classNames";
import type { PhTreeResponse } from "../../types";

interface TreeCardProps {
    tree?: PhTreeResponse & { username: string | Promise<string>; };
    edit?: boolean;
}

const rep = (n?: number) => {
    if(n === undefined) return undefined;
    if(Math.abs(n) < 1e3) return n.toFixed(0);
    if(Math.abs(n) < 1e6) return (n / 1e3).toFixed(2) + "k";
    if(Math.abs(n) < 1e9) return (n / 1e6).toFixed(2) + "M";
    if(Math.abs(n) < 1e12) return (n / 1e9).toFixed(2) + "B";
};

export const TreeCard = ({
    tree,
    edit
}: TreeCardProps) => {
    const { id, image, name, username, likes, comments, views, tags = [] } = tree ?? {};
    return (
        <a className={card + " " + title} href={`${edit ? "/account" : ""}/trees/${id}`}>
            <div className="flex flex-row justify-between p-4 items-center">
                <div className="flex flex-col">
                    <h3 className={"text-start text-[1.17em] " + title}>{name}</h3>
                    <p className="text-start">By: @{username}</p>
                </div>
                {image && <img src={image} className={"h-10! w-10! " + circleImage}/>}
            </div>
            {tags.length > 0 && <div className="flex flex-wrap px-4 items-center space-x-2 space-y-2">
                {tags.map((t, index) => <p key={index} className="p-2 bg-neutral-300 dark:bg-neutral-700 rounded text-black dark:text-white">
                    {t}
                </p>)}
            </div>}
            <div className="flex justify-between flex-row w-full p-4">
                <div className="flex flex-row items-center space-x-1">
                    <i className="fas fa-heart"/>
                    <p>{rep(likes)}</p>
                </div>
                <div className="flex flex-row space-x-3">
                <div className="flex flex-row items-center space-x-1">
                    <i className="fas fa-eye"/>
                    <p>{rep(views)}</p>
                </div>
                <div className="flex flex-row items-center space-x-1">
                    <i className="fas fa-comment"/>
                    <p>{rep(comments)}</p>
                </div>
                </div>
            </div>
        </a>
    )
};