import { useEffect, useState } from "react"
import { PricingNavBar } from "../components/PricingNavBar"
import { BillingToggle } from "../components/BillingToggle"
import { PlansGrid } from "../components/PlansGrid";
import { PlansComparision } from "../components/PlansComparision";
import { getMe } from "../api/user";
import type { Plan } from "../enums";
import { plans } from "../data/prices";

export const Pricing = () => {
    const [monthly, setMonthly] = useState(false);
    const [currentPlan, setCurrentPlan] = useState<Plan | undefined>();

    useEffect(() => {
        document.title = "Life Tree | Pricing";
        getMe({}).then(user => setCurrentPlan(user?.plan));
    }, []);

    return (
        <>
            <PricingNavBar/>
            <div className="py-[2rem] px-[1.5rem] w-screen flex flex-col items-center">
                <BillingToggle
                    monthly={monthly}
                    setMonthly={setMonthly}
                />
                <PlansGrid
                    monthly={monthly}
                    currentPlan={currentPlan}
                />
                <PlansComparision
                    prices={[...plans.values()]}
                    features={[
                        {
                            name: "Number of Trees",
                            fun: p => p.constraints.maxTrees ?? "Unlimited"
                        },
                        {
                            name: "Species per Tree",
                            fun: p => p.constraints.maxSpecies ?? "Unlimited"
                        },
                        {
                            name: "Collaborators per Tree",
                            fun: p => p.constraints.maxCollaborators ?? <i className="fas fa-times text-red-600"/>
                        },
                        {
                            name: "Images Export",
                            fun: () => <i className="fas fa-check text-green-600"/>
                        },
                        {
                            name: "Export Formats",
                            fun: () => "jpg, jpeg, png, gif, svg".toUpperCase()
                        },
                        {
                            name: "Visualization",
                            fun: () => "Professional"
                        },
                        {
                            name: "Monthly Cost",
                            fun: p => `$${p.month.toFixed(2)}`
                        },
                        {
                            name: "Annual Cost",
                            fun: p => `$${p.year.toFixed(2)}`
                        }
                    ]}
                />
            </div>
        </>
    )
}