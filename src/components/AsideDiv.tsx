import { nullableInput } from "../utils/nullableInput";

export const AsideDiv = () => {
    const aside = document.querySelector("aside");
    const paddingTop = nullableInput(aside?.clientHeight, h => 2 * h);
    return (
        <div style={{ paddingTop }} className="block sm:hidden bg-[#D8EDD9] dark:bg-[#1B5E20] border-t border-t-[#D8EDD9] dark:border-t-[#1B5E20]"/>
    )
}