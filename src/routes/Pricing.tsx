import { useEffect, useState } from "react"
import { BillingToggle } from "../components/pricing/BillingToggle"
import { PlansGrid } from "../components/pricing/PlansGrid";
import { PlansComparision } from "../components/pricing/PlansComparision";
import { getMe, token } from "../api/user";
import { plans } from "../data/prices";
import { PricingFAQs } from "../components/pricing/PricingFAQs";
import { faqs, features } from "../data/features";
import { Header } from "../components/dashboard/Header";
import { Sidebar } from "../components/dashboard/Sidebar";
import type { UserResponse } from "../types";
import { dashboardItems } from "../data/dashboardItems";
import { title } from "../data/classNames";
import { Billing, type Plan } from "../enums";

interface PricingProps {
    plan?: Plan;
    billing?: Billing;
}

export const Pricing = ({
    plan,
    billing
}: PricingProps) => {
    const [expanded, setExpanded] = useState(false);
    const [user, setUser] = useState<UserResponse | undefined>(undefined);
    const [monthly, setMonthly] = useState(billing === Billing.MONTHLY);
    const [faq, setFaq] = useState<number | undefined>(undefined)

    useEffect(() => {
        document.title = "Life Tree | Pricing";
        getMe({}).then(setUser);
        token({ expiresIn: "7d" });
    }, []);

    const changeFaq = (n: number) => setFaq(faq === n ? undefined : n);

    return (
        <div className="size-full flex flex-col-reverse sm:flex-row justify-between h-screen sm:justify-start relative">
            {user && <Sidebar
                expanded={expanded}
                setExpanded={setExpanded}
                items={dashboardItems}
                user={user}
            />}
            <main className="flex flex-col w-full h-full top-0 absolute sm:relative">
                <Header>
                    <h1 className={"block text-[2em]! font-bold " + title}>Plans & Prices</h1>
                </Header>
                <div className="p-10 w-full flex flex-col items-center overflow-y-scroll">
                    <BillingToggle
                        monthly={monthly}
                        setMonthly={setMonthly}
                    />
                    <PlansGrid
                        monthly={monthly}
                        user={user}
                        plan={plan}
                    />
                    <PlansComparision
                        prices={[...plans.values()]}
                        features={features}
                    />
                    <PricingFAQs
                        active={faq}
                        onClick={changeFaq}
                        faqs={faqs}
                    />
                </div>
            </main>
        </div>
    )
}