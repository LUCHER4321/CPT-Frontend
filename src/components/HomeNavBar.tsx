import { blankButton, borderButton, filledButton } from "../data/classNames";
import { BurgerMenu } from "./BurgerMenu";
import { HomeButton } from "./HomeButton";
import { LinkButton } from "./LinkButton";
import { NavBar } from "./NavBar";

interface HomeNavBarProps {
    open?: boolean;
    setOpen?: (o: boolean) => void;
}

export const HomeNavBar = ({
    open,
    setOpen
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
                        <input type="text" placeholder="search trees..." className="bg-green-800 dark:bg-lime-300 placeholder-lime-300 dark:placeholder-green-800 px-4 mx-1 rounded-[2rem]"/>
                        <LinkButton href="#top-trees" className={"m-1 " + blankButton}>Featured Trees</LinkButton>
                        <LinkButton className={"m-1 " + blankButton}>Pricing</LinkButton>
                        <LinkButton className={"m-1 " + borderButton}>Log In</LinkButton>
                        <LinkButton className={"m-1 " + filledButton}>Register</LinkButton>
                    </BurgerMenu>
                </div>
            </NavBar>
            <div className="h-20"/>
        </>
    );
};