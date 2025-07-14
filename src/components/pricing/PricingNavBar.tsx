import { title } from "../../data/classNames"
import { NavBar } from "../NavBar"

export const PricingNavBar = () => {
    return(
        <>
            <NavBar className="p-[1.5rem]!">
                <a className="w-10 aspect-square justify-center flex items-center" href="/">
                    <i className={"fas fa-arrow-left " + title}/>
                </a>
                <h1 className={"text-[1.5rem]! font-semibold flex items-center " + title}>Plans & Prices</h1>
                <a className="w-10 aspect-square justify-center flex items-center invisible" href="/">
                    <i className={"fas fa-arrow-left " + title}/>
                </a>
            </NavBar>
            <div className="h-[4.7rem]"/>
        </>
    )
}