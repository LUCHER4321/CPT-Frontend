import { title } from "../../data/classNames";

interface SideHeaderProps{
    expanded?: boolean;
}

export const SideHeader = ({
    expanded
}: SideHeaderProps) => {
    return (
        <div className="px-4 py-6 border-b">
            <a href="/" className={`text-xl line-clamp-1 ${expanded ? "" : "invisible"} ${title}`}>Life Tree</a>
        </div>
    )
};