import { useEffect, useState } from "react"
import { PricingNavBar } from "../components/PricingNavBar"
import { BillingToggle } from "../components/BillingToggle"
import { PlansGrid } from "../components/PlansGrid";
import { PlansComparision } from "../components/PlansComparision";
import { getMe } from "../api/user";
import type { Plan } from "../enums";
import { plans } from "../data/prices";
import { PricingFAQs } from "../components/PricingFAQs";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

export const Pricing = () => {
    const [monthly, setMonthly] = useState(false);
    const [currentPlan, setCurrentPlan] = useState<Plan | undefined>();
    const [faq, setFaq] = useState<number | undefined>(undefined)

    useEffect(() => {
        document.title = "Life Tree | Pricing";
        getMe({}).then(user => setCurrentPlan(user?.plan));
    }, []);

    const changeFaq = (n: number) => setFaq(faq === n ? undefined : n);

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
                            name: "Premium accounts",
                            fun: (p) => p.name === "Premium" ? "User" : (p.constraints.extraConstraints?.filter(c => c.startsWith("Premium accounts") && c.includes(" for ")).length ?? 0) > 0 ? p.constraints.extraConstraints?.filter(c => c.startsWith("Premium accounts") && c.includes(" for ")).map(c => capitalizeFirstLetter(c.split(" for ")[1])).join(", ") : <i className="fas fa-times text-red-600"/>
                        },
                        {
                            name: "Personalized domain",
                            fun: (p) => (p.constraints.extraConstraints?.filter(c => c.startsWith("Personalized domain")).length ?? 0) > 0 ? <i className="fas fa-check text-green-600"/> : <i className="fas fa-times text-red-600"/>
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
                <PricingFAQs
                    active={faq}
                    onClick={changeFaq}
                    faqs={[
                        {
                            question: "Can I change plans at any time?",
                            answer: "Yes, you can change your plan at any time from your account settings. Changes will take effect immediately, and your billing proration will be adjusted."
                        },
                        {
                            question: "What payment methods do you accept?",
                            answer: "We accept all major credit and debit cards (Visa, MasterCard, American Express), as well as PayPal and bank transfers for annual payments."
                        },
                        {
                            question: "Can I cancel my subscription at any time?",
                            answer: "Absolutely. You can cancel your subscription at any time without penalty. You'll have access to premium features until the end of your current billing period."
                        }
                    ]}
                />
            </div>
        </>
    )
}