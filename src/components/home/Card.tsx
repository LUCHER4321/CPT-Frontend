import { card, title as titleClass } from "../../data/classNames";

interface CardProps {
    fa?: string;
    title?: string;
    description?: string;
    href?: string;
    image?: string;
    onClick?: () => void;
    children?: any;
}

export const Card = ({
    fa,
    title,
    description,
    href,
    image,
    onClick,
    children
}: CardProps) => {
    const inside = (
        <>
            {image ? <img className="h-10! rounded-full" src={image}/> : <i className={"text-[2.5rem] mb-[1rem] fas " + fa + " " + titleClass}/>}
            <h3 className={"mb-4 " + titleClass}>{title}</h3>
            <p className="text-[#1B5E20]! dark:text-[#D8EDD9]!">{description}</p>
            {children}
        </>
    )
    return (
        <>
            {href ? <a className={"p-[2rem] relative " + card} href={href} onClick={onClick}>
                {inside}
            </a> : <button className={"p-[2rem] relative border-black/0! focus:outline-0! focus-visible:outline-0! " + card} onClick={onClick}>
                {inside}
            </button>}
        </>
    );
};