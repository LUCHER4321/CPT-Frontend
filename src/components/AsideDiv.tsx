import { nullableInput } from "../utils/nullableInput";

export const AsideDiv = () => {
    const aside = document.querySelector("aside");
    const marginTop = nullableInput(aside?.clientHeight, h => 2 * h);
    return (
        <div style={{ marginTop }} className="block sm:hidden"/>
    )
}