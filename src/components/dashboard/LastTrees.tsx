import { title } from "../../data/classNames";
import type { PhTreeResponse } from "../../types";
import { Card } from "../home/Card";

interface LastTreesProps {
    lastTrees?: PhTreeResponse[]
}

export const LastTrees = ({
    lastTrees = []
}: LastTreesProps) => {
    return (
        <>
            <h2 className={"col-span-full text-[2rem] mb-2 " + title}>Last Trees</h2>
            {lastTrees.map(({
                id,
                name,
                description,
                image,
                isPublic,
                likes,
                comments
            }, index) => (
                <Card
                    key={index}
                    fa={"fa-project-diagram"}
                    title={name}
                    description={description}
                    href={`/account/trees/${id}`}
                    image={image}
                >
                    <i className={"absolute text-[1.5rem] right-[0.5rem] top-[0.5rem] fas " + title + " " + (isPublic ? "fa-globe" : "fa-lock")}/>
                    {isPublic && <div className="flex flex-row w-full justify-between">
                        <div className={"flex flex-row items-center space-x-1 " + title}>
                            <i className="fas fa-heart"/>
                            <p>{likes}</p>
                        </div>
                        <div className={"flex flex-row items-center space-x-1 " + title}>
                            <i className="fas fa-comment"/>
                            <p>{comments}</p>
                        </div>
                    </div>}
                </Card>
            ))}
        </>
    )
};