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
            className={`sm:relative fixed bottom-0 flex flex-row sm:flex-col w-full sm:h-screen! overflow-x-scroll sm:overflow-x-hidden justify-between shadow-lg transition-all duration-300 ${expanded ? "sm:w-62.5" : "sm:w-20"} z-10 sm:z-auto dark:bg-neutral-800 bg-white`}
            onMouseEnter={() => setExpanded?.(true)}
            onMouseLeave={() => setExpanded?.(false)}
        >
            <SideHeader
                expanded={expanded}
                className="hidden sm:block"
            />
            <ul className="flex flex-row sm:flex-col sm:py-3 justify-around w-full sm:w-auto sm:h-full">
                {items?.map(({
                    href,
                    icon,
                    name
                }, index) => <NavItem
                    href={`/account${href}`}
                    icon={icon}
                    expanded={expanded}
                    current={href === currentPage}
                    key={index}
                >
                    <p className="hidden sm:inline">{name}</p>
                </NavItem>)}
            </ul>
            <SideFooter
                user={user}
                expanded={expanded}
                className="ml-4 sm:mt-auto"
                href="/auth"
            />
        </aside>
    )
};