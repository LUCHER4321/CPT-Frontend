interface NavBarProps {
    children?: any;
    className?: string
}

export const NavBar = ({
    children,
    className
}: NavBarProps) => {
    return (
        <nav className={"z-10 flex justify-between bg-[#D8EDD9] dark:bg-[#1B5E20] fixed left-0 right-0 top-0 py-4 px-8 sm:px-20 " + className}>
            { children }
        </nav>
    );
};