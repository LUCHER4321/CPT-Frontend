import { unborder } from "../../../data/classNames";

interface ToolButtonProps {
    title?: string;
    icon?: string;
    onClick?: () => void;
    enable?: boolean;
    className?: string;
}

export const ToolButton = ({
    title,
    icon,
    onClick,
    enable = true,
    className
}: ToolButtonProps) => {
    return (
        <button
            className={`size-9 rounded p-0! flex items-center justify-center text-[calc(40px/3)]! ${enable ? "bg-[#D8EDD9]! dark:bg-[#1B5E20]! text-[#1B5E20]! dark:text-[#D8EDD9]! hover:bg-[#1B5E20]! hover:text-[#D8EDD9]! hover:dark:bg-[#D8EDD9]! hover:dark:text-[#1B5E20]!" : "cursor-not-allowed!"} ${unborder} ${className}`}
            onClick={enable ? onClick : undefined}
            title={enable ? title : undefined}
        >
            <i className={"fas " + icon}/>
        </button>
    )
};