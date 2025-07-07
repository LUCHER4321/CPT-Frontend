interface NavBarProps {
    children?: any;
}

export const NavBar = ({
    children
}: NavBarProps) => {
    return (
        <nav className="z-10 flex justify-between bg-lime-300 dark:bg-green-800 fixed left-0 right-0 top-0 py-4 px-8 sm:px-20">
            { children }
        </nav>
    );
};