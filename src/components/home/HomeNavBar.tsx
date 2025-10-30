import { blankButton, borderButton, filledButton } from "../../data/classNames";
import { BurgerMenu } from "./BurgerMenu";
import { HomeButton } from "./HomeButton";
import { IconInput } from "../IconInput";
import { LinkButton } from "../LinkButton";
import { NavBar } from "../NavBar";
import type { UserResponse } from "../../types";

interface HomeNavBarProps {
    open?: boolean;
    setOpen?: (o: boolean) => void;
    search?: string;
    setSearch?: (s: string) => void;
    user?: UserResponse;
}

export const HomeNavBar = ({
    open,
    setOpen,
    search,
    setSearch,
    user
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
                            className="bg-[#1B5E20] dark:bg-[#D8EDD9] placeholder-white text-white dark:placeholder-black dark:text-black px-4 mx-1 rounded-full h-full w-full sm:w-auto"
                            value={search}
                            setValue={setSearch}
                            icon="fa-search text-white dark:text-black"
                            href={`/trees?search=${search}`}
                            buttonClassName={(search?.length ?? 0) > 0 ? "cursor-pointer!" : "cursor-not-allowed!"}
                        />
                        <LinkButton href="/#top-trees" className={"m-1 " + blankButton}>Featured Trees</LinkButton>
                        <LinkButton href="/pricing" className={"m-1 " + blankButton}>Pricing</LinkButton>
                        <LinkButton href="#footer" className={"m-1 " + blankButton}>Contact Us</LinkButton>
                        <LinkButton href={user?.id ? "/account" : "/auth"} className={"m-1 " + borderButton}>Log In</LinkButton>
                        {!user?.id && <LinkButton href="/auth?register=true" className={"m-1 " + filledButton}>Register</LinkButton>}
                    </BurgerMenu>
                </div>
            </NavBar>
            <div className="h-20"/>
        </>
    );
};