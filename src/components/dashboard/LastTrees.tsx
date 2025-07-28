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
                isPublic
            }, index) => (
                <Card
                    key={index}
                    fa={"fa-project-diagram"}
                    title={name}
                    description={description}
                    href={`/account/trees/${id}`}
                    image={image}
                >
                    <i className={"fas " + isPublic ? "fa-globe" : "fa-lock"}/>
                </Card>
            ))}
        </>
    )
};