interface BurgerMenuProps {
    children?: any;
    open?: boolean;
    setOpen?: (o: boolean) => void;
}

export const BurgerMenu = ({
    children,
    setOpen,
    open
}: BurgerMenuProps) => {
    const onClick = setOpen ? () => setOpen(!(open ?? false)) : () => {};
    return (
        <>
            <div className="hidden sm:flex flex-row">
                {children}
            </div>
            <button className={open ? "sm:hidden fixed top-0 bottom-0 left-0 right-0 bg-black/10! rounded-0!" : "hidden"} onClick={onClick}/>
            <div className={open ? "sm:hidden fixed top-0 bottom-1/2 left-1/2 right-0 flex flex-col justify-center bg-lime-300 dark:bg-green-800 p-5 -z-1" : "hidden"}>
                {children}
            </div>
            <button className="none flex sm:hidden h-full items-center bg-black/0! p-0!" onClick={onClick}>
                <i className="fas fa-bars"/>
            </button>
        </>
    )
};