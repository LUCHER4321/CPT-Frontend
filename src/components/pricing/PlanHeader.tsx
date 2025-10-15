import { plans } from "../../data/prices";
import type { Plan } from "../../enums";

interface PlanHeaderProps {
    plan?: Plan;
    monthly?: boolean;
    children?: any;
}

export const PlanHeader = ({
    plan,
    monthly,
    children
}: PlanHeaderProps) => {
    if(!plan) return <></>;
    const price = plans.get(plan);
    if(!price) return <></>;
    const [dollars, cents] = (monthly ? price.month : (price.year / 12)).toFixed(2).split(".")
    return (
        <div className="mb-6 text-center">
            <h3 className={`text-2xl font-bold mb-2 ${price.color?.light} ${price.color?.dark}`}>{price.name}</h3>
            <div className="mb-2">
                {dollars !== "NaN" && <span className="text-[2.5rem] font-bold">${dollars}</span>}
                {dollars === "NaN" && <span className="text-[2.5rem] font-bold">Contact Us</span>}
                {dollars !== "NaN" && <span className="text-xl font-bold">.{cents}</span>}
                {dollars !== "NaN" && <span>/month</span>}
                {dollars !== "NaN" && <span className={"w-full block text-[#1B5E20] dark:text-[#D8EDD9] transition-all duration-500 " + (monthly || price.year <= 0 ? "text-black/0!" : "")}>${price.year.toFixed(2)}/year</span>}
            </div>
            <p className="">{children}</p>
        </div>
    )
}