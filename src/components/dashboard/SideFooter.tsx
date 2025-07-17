import { plans } from "../../data/prices";
import type { UserResponse } from "../../types"

interface SideFooterProps {
    user?: UserResponse;
    href?: string;
    expanded?: boolean
}

export const SideFooter = ({
    user,
    href,
    expanded
}: SideFooterProps) => {
    const {
        photo,
        username,
        plan
    } = user ?? {};
    const photoClass = "rounded-full aspect-square size-10 flex justify-center"
    return (
        <div className="border-t p-4 pb-8">
            <div className={`flex flex-row ${expanded ? "justify-between" : "justify-center"} items-center space-x-[0.75rem] dark:text-[#D8EDD9] text-[#1B5E20]`}>
                {photo ? <img src={photo} className={photoClass} alt="Profile"/> : <i className={photoClass + " fas fa-user dark:text-[#D8EDD9] text-[#1B5E20] text-center text-4xl"}/>}
                {expanded && <div className="flex flex-col">
                    {username && <p className="block font-medium line-clamp-1">@{username}</p>}
                    {plan && <p className="block text-xs line-clamp-1">{plans.get(plan)?.name} Plan</p>}
                </div>}
                {expanded && <a href={href} className="dark:text-[#D8EDD9]! text-[#1B5E20]!">
                    <i className="fas fa-sign-out-alt"/>
                </a>}
            </div>
        </div>
    )
};