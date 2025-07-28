import { card, title as titleClass } from "../../data/classNames";

interface CardProps {
    fa?: string;
    title?: string;
    description?: string;
    href?: string;
    image?: string;
    children?: any;
}

export const Card = ({
    fa,
    title,
    description,
    href,
    image,
    children
}: CardProps) => {
    return (
        <a className={"p-[2rem] relative " + card} href={href}>
            {image ? <img className="h-10! rounded-full" src={image}/> : <i className={"text-[2.5rem] mb-[1rem] fas " + fa + " " + titleClass}/>}
            <h3 className={"mb-4 " + titleClass}>{title}</h3>
            <p className="text-[#1B5E20]! dark:text-[#D8EDD9]!">{description}</p>
            {children}
        </a>
    );
};