import { title } from "../data/classNames"
import { NavBar } from "./NavBar"

export const PricingNavBar = () => {
    return(
        <>
            <NavBar className="p-[1.5rem]!">
                <div></div>
                <h1 className={"text-[1.5rem]! font-semibold " + title}>Plans & Prices</h1>
                <div></div>
            </NavBar>
            <div className="h-[4.7rem]"/>
        </>
    )
}