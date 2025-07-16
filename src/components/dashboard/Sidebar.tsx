import type { UserResponse } from "../../types";
import { NavItem } from "./NavItem";
import { SideFooter } from "./SideFooter";
import { SideHeader } from "./SideHeader";

interface SidebarProps {
    expanded?: boolean;
    user?: UserResponse;
    items?: {
        href?: string;
        icon?: string;
        name?: string;
    }[];
    currentPage?: string;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

export const Sidebar = ({
    expanded,
    user,
    items,
    currentPage,
    onMouseEnter,
    onMouseLeave
}: SidebarProps) => {
    return (
        <aside
            className={`flex flex-col h-screen! justify-between shadow-lg transition-all duration-300 ${expanded ? "w-62.5" : "w-20"}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <SideHeader
                expanded={expanded}
            />
            <ul className="flex flex-col py-3 h-full">
                {items?.map(({
                    href,
                    icon,
                    name
                }) => <NavItem
                    href={`/account${href}`}
                    icon={icon}
                    expanded={expanded}
                    current={href === currentPage}
                >
                    {name}
                </NavItem>)}
            </ul>
            <SideFooter
                user={user}
                expanded={expanded}
            />
        </aside>
    )
};