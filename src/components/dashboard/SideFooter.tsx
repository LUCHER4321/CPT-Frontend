import { useNavigate } from "react-router-dom";
import { logout } from "../../api/user";
import { plans } from "../../data/prices";
import type { UserResponse } from "../../types"
import { nullableInput } from "../../utils/nullableInput";
import { photoClass, unborder } from "../../data/classNames";

interface SideFooterProps {
    user?: UserResponse;
    href?: string;
    expanded?: boolean;
    className?: string;
}

export const SideFooter = ({
    user,
    href,
    expanded,
    className
}: SideFooterProps) => {
    const {
        photo,
        username,
        plan
    } = user ?? {};
    const history = useNavigate();
    return (
        <div className={"sm:border-t p-4 pl-10 sm:pl-0 sm:pb-8 " + className}>
            <div className={`flex flex-row ${expanded ? "justify-between" : "justify-center"} items-center space-x-[0.75rem] dark:text-[#D8EDD9] text-[#1B5E20]`}>
                <a href="/account/profile">
                    {photo ? <img src={photo} className={photoClass} alt="Profile"/> : <i className={photoClass + " fas fa-user dark:text-[#D8EDD9] text-[#1B5E20] text-center text-4xl"}/>}
                </a>
                <div className={`flex ${expanded ? "" : "sm:hidden"} flex-col`}>
                    {username && <p className="block font-medium line-clamp-1">@{username}</p>}
                    {plan && <p className="block text-xs line-clamp-1">{plans.get(plan)?.name} Plan</p>}
                </div>
                <button
                    onClick={() => {
                        if(confirm("Are you sure you wanna log out?")) logout({}).then(() => nullableInput(href, hr => history(hr)));
                    }}
                    className={`dark:text-[#D8EDD9]! text-[#1B5E20]! flex ${expanded ? "" : "sm:hidden"} justify-end p-0! bg-black/0! ${unborder}`}
                >
                    <i className="fas fa-sign-out-alt"/>
                </button>
            </div>
        </div>
    )
};