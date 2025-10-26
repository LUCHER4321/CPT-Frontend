import { unborder } from "../../data/classNames";

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
    const onClick = () => setOpen?.(!(open ?? false));
    return (
        <>
            <div className="hidden sm:flex flex-row">
                {children}
            </div>
            {false && <button className={open ? "sm:hidden fixed top-0 bottom-0 left-0 right-0 bg-black/10! rounded-0!" : "hidden"} onClick={onClick}/>}
            <div className={"sm:hidden fixed top-20 left-1/2 right-0 flex flex-col justify-center text-center bg-[#D8EDD9] dark:bg-[#1B5E20] -z-1 transition-[max-height] duration-300 " + (open ? "p-5! max-h-[50vh]" : "max-h-0! overflow-hidden")}>
                {children}
            </div>
            <button className={"none flex sm:hidden h-full items-center bg-black/0! p-0! " + unborder} onClick={onClick}>
                <i className={"fas transition-all duration-300 " + (open ? "fa-times" : "fa-bars")}/>
            </button>
        </>
    )
};