import { card, title as titleClass } from "../data/classNames";

interface CardProps {
    fa?: string;
    title?: string;
    description?: string;
}

export const Card = ({
    fa,
    title,
    description
}: CardProps) => {
    return (
        <div className={"p-[2rem] " + card}>
            <i className={"text-[2.5rem] mb-[1rem] fas " + fa + " " + titleClass}/>
            <h3 className={"mb-4 " + titleClass}>{title}</h3>
            <p>{description}</p>
        </div>
    );
};