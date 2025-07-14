import { plans } from "../data/prices";
import { Billing, type Plan } from "../enums";
import { PlanHeader } from "./PlanHeader";
import { PriceFeatures } from "./PriceFeatures";

interface PlanCardProps {
    plan?: Plan;
    monthly?: boolean;
    children?: string;
    className?: string;
}

export const PlanCard = ({
    plan,
    monthly,
    children
}: PlanCardProps) => {
    const {
        description,
        button
    } = plan ? plans.get(plan) ?? {} : {};
    const {
        light,
        dark
    } = button ?? {};
    return (
        <div className={`rounded-xl p-6 pb-21 border border-t-4 relative hover:-translate-y-[5px] transition-all duration-300 ${plan ? `${plans.get(plan)?.border?.light ?? ""} ${plans.get(plan)?.border?.dark ?? ""}` : ""}`}>
            <PlanHeader
                plan={plan}
                monthly={monthly}
            >
                {description}
            </PlanHeader>
            <PriceFeatures
                plan={plan}
            />
            <a href={"/auth?register=true&plan=" + plan + (monthly ? "&billing=" + Billing.MONTHLY : "")}>
                <button className={`absolute bottom-6 left-6 right-6 text-black dark:text-white ${light} ${dark}`}>
                    {children}
                </button>
            </a>
        </div>
    )
}