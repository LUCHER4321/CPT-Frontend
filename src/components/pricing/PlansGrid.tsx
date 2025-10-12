import { plans } from "../../data/prices";
import type { Plan } from "../../enums";
import type { UserResponse } from "../../types";
import { PlanCard } from "./PlanCard";

interface PlansGridProps {
    monthly?: boolean;
    user?: UserResponse;
    plan?: Plan
}

export const PlansGrid = ({
    monthly,
    user,
    plan
}: PlansGridProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-12">
            {[...plans.keys()].map((p, index) => <PlanCard
                user={user}
                plan={p}
                currentPlan={plan}
                monthly={monthly}
                key={index}
            >
                {user ? user.plan === p ? "Your current plan" : `${index > [...plans.keys()].indexOf(user.plan) ? "Up" : "Down"}grade to ${plans.get(p)?.name}` : `Start with ${plans.get(p)?.name} Plan`}
            </PlanCard>)}
        </div>
    )
}