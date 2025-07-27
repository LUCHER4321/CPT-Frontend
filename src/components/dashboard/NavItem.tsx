interface NavItemProps {
    href?: string;
    icon?: string;
    children?: any;
    expanded?: boolean;
    current?: boolean;
}

export const NavItem = ({
    href,
    icon,
    children,
    expanded,
    current
}: NavItemProps) => {
    return (
        <li className={`my-1 px-6 py-3 relative ${current ? "bg-[#1B5E20] dark:bg-[#D8EDD9]" : ""}`}>
            <a href={href} className={`line-clamp-1 ${current ? "text-[#D8EDD9]! dark:text-[#1B5E20]!" : "dark:text-[#D8EDD9]! text-[#1B5E20]!"}`}>
                <i className={`${expanded ? "sm:mr-4" : ""} fas ${icon} w-5`}/>
                {expanded && children}
            </a>
            {current && <div className="absolute sm:top-0 bottom-0 left-0 right-0 sm:right-auto h-1 sm:h-auto sm:w-1 bg-[#D8EDD9] dark:bg-[#1B5E20]"/>}
        </li>
    )
};