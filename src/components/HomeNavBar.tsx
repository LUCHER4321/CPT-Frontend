import { blankButton, borderButton, filledButton } from "../data/classNames";
import { BurgerMenu } from "./BurgerMenu";
import { HomeButton } from "./HomeButton";
import { IconInput } from "./IconInput";
import { LinkButton } from "./LinkButton";
import { NavBar } from "./NavBar";

interface HomeNavBarProps {
    open?: boolean;
    setOpen?: (o: boolean) => void;
    search?: string;
    setSearch?: (s: string) => void;
}

export const HomeNavBar = ({
    open,
    setOpen,
    search,
    setSearch
}: HomeNavBarProps) => {
    return (
        <>
            <NavBar>
                <HomeButton/>
                <div>
                    <BurgerMenu
                        open={open}
                        setOpen={setOpen}
                    >
                        <IconInput
                            type="text"
                            placeholder="search trees..."
                            className="bg-[#1B5E20] dark:bg-[#D8EDD9] placeholder-white text-white dark:placeholder-black dark:text-black px-4 mx-1 rounded-[2rem] h-full"
                            value={search}
                            setValue={setSearch}
                            icon="fa-search text-white dark:text-black"
                            buttonClassName={(search?.length ?? 0) > 0 ? "" : "cursor-not-allowed!"}
                        />
                        <LinkButton href="/#top-trees" className={"m-1 " + blankButton}>Featured Trees</LinkButton>
                        <LinkButton className={"m-1 " + blankButton}>Pricing</LinkButton>
                        <LinkButton href="/auth" className={"m-1 " + borderButton}>Log In</LinkButton>
                        <LinkButton href="/auth?register=true" className={"m-1 " + filledButton}>Register</LinkButton>
                    </BurgerMenu>
                </div>
            </NavBar>
            <div className="h-20"/>
        </>
    );
};