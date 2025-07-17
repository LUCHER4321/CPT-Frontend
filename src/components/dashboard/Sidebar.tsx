import type { UserResponse } from "../../types";
import { NavItem } from "./NavItem";
import { SideFooter } from "./SideFooter";
import { SideHeader } from "./SideHeader";

interface SidebarProps {
    expanded?: boolean;
    setExpanded?: (b: boolean) => void
    user?: UserResponse;
    items?: {
        href?: string;
        icon?: string;
        name?: string;
    }[];
    currentPage?: string;
}

export const Sidebar = ({
    expanded,
    setExpanded,
    user,
    items,
    currentPage,
}: SidebarProps) => {
    return (
        <aside
            className={`flex flex-col h-screen! justify-between shadow-lg transition-all duration-300 ${expanded ? "w-62.5" : "w-20"}`}
            onMouseEnter={() => setExpanded?.(true)}
            onMouseLeave={() => setExpanded?.(false)}
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