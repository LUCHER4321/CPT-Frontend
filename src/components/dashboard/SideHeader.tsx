import { title } from "../../data/classNames";

interface SideHeaderProps{
    expanded?: boolean;
    className?: string;
}

export const SideHeader = ({
    expanded,
    className
}: SideHeaderProps) => {
    return (
        <div className={"px-4 py-6 border-b " + className}>
            <a href="/" className={`text-xl line-clamp-1 ${expanded ? "" : "invisible"} ${title}`}>Life Tree</a>
        </div>
    )
};