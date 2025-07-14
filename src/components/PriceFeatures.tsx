import { plans } from "../data/prices";
import type { Plan } from "../enums";
import { PlanFeatures } from "./PlanFeatures";

interface PriceFeaturesProps {
    plan?: Plan;
}

export const PriceFeatures = ({
    plan
}: PriceFeaturesProps) => {
    if(!plan) return <></>;
    const {
        maxTrees,
        maxSpecies,
        maxCollaborators,
        extraConstraints
    } = plans.get(plan)?.constraints ?? {};
    return (
        <PlanFeatures>
            {`${maxTrees ? `Up to ${maxTrees}` : "Unlimited"} phylogenetic trees
            ${maxSpecies ? `Up to ${maxSpecies}` : "Unlimited"} species per tree
            ${maxCollaborators ? `Up to ${maxCollaborators} collaborators per tree` : ""}
            Upload images many formats (jpg, jpeg, png, gif, svg)
            Professional visualization
            Access to phylogenetic trees created by the community
            ${extraConstraints?.join("\n") ?? ""}`}
        </PlanFeatures>
    )
}