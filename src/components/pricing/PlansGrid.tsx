import { plans } from "../../data/prices";
import type { Plan } from "../../enums";
import { PlanCard } from "./PlanCard";

interface PlansGridProps {
    monthly?: boolean;
    currentPlan?: Plan;
}

export const PlansGrid = ({
    monthly,
    currentPlan
}: PlansGridProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-12">
            {[...plans.keys()].map((p, index) => <PlanCard
                plan={p}
                monthly={monthly}
                key={index}
            >
                {currentPlan ? currentPlan === p ? "Your current plan" : `${Number(p) > Number(currentPlan) ? "Up" : "Down"}grade to ${plans.get(p)?.name}` : `Start with ${plans.get(p)?.name} Plan`}
            </PlanCard>)}
        </div>
    )
}