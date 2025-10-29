import { plans } from "../../data/prices";
import type { Plan } from "../../enums";
import type { UserResponse } from "../../types";
import { nullableInput } from "../../utils/nullableInput";
import { PlanCard } from "./PlanCard";

interface PlansGridProps {
    monthly?: boolean;
    user?: UserResponse;
    setUser?: (user?: UserResponse) => void;
    plan?: Plan;
    className?: string;
}

export const PlansGrid = ({
    monthly,
    user,
    setUser,
    plan,
    className
}: PlansGridProps) => {
    return (
        <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-12 " + className}>
            {[...plans.keys()].map((p, index) => <PlanCard
                user={user}
                setUser={setUser}
                plan={p}
                currentPlan={plan}
                monthly={monthly}
                key={index}
            >
                {!Number.isNaN(nullableInput(p, p1 => plans.get(p1))?.month) ? user ? user.plan === p ? "Your current plan" : `${index > [...plans.keys()].indexOf(user.plan) ? "Up" : "Down"}grade to ${plans.get(p)?.name}` : `Start with ${plans.get(p)?.name} Plan` : "Contact Us"}
            </PlanCard>)}
        </div>
    )
}