import { pauseSubscriptions } from "../../api/payPal";
import { updateMe } from "../../api/user";
import { unborder } from "../../data/classNames";
import { plans } from "../../data/prices";
import { Billing, Plan } from "../../enums";
import type { UserResponse } from "../../types";
import { ButtonsWrapper } from "./ButtonsWrapper";
import { PayPalProvider } from "./PayPalProvider";
import { PlanHeader } from "./PlanHeader";
import { PriceFeatures } from "./PriceFeatures";

interface PlanCardProps {
    user?: UserResponse;
    plan?: Plan;
    monthly?: boolean;
    children?: string;
    className?: string;
}

export const PlanCard = ({
    user,
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
    const myPlan = user?.plan === plan && monthly === (user?.billing === Billing.MONTHLY);
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
            {user ? ((plan === Plan.FREE || myPlan) ? <button
                className={`absolute bottom-6 left-6 right-6 text-black dark:text-white ${light} ${dark} ${unborder} ${myPlan ? "cursor-not-allowed!" : ""}`}
                onClick={async () => {
                    if(user?.billing && user.plan !== Plan.FREE && confirm(`Are you sure you wanna unsubscribe to your ${plans.get(user.plan)?.name} plan?`)){
                        await pauseSubscriptions(plans.get(user.plan)?.id?.get(user.billing));
                        await updateMe({
                            plan: Plan.FREE,
                            billing: null
                        });
                    }
                }}
            >
                {children}
            </button> : <PayPalProvider>
                <ButtonsWrapper
                    className="absolute bottom-6 left-6 right-6"
                    planId={plans.get(plan ?? Plan.FREE)?.id?.get(monthly ? Billing.MONTHLY : Billing.ANNUAL)}
                    onApprove={async () => {
                        if(user?.billing && user.plan !== Plan.FREE) await pauseSubscriptions(plans.get(user.plan)?.id?.get(user.billing));
                        await updateMe({
                            plan,
                            billing: monthly ? Billing.MONTHLY : Billing.ANNUAL
                        });
                    }}
                >
                    {children}
                </ButtonsWrapper>
            </PayPalProvider>) : <a href={"/auth?register=true&plan=" + plan + (monthly ? "&billing=" + Billing.MONTHLY : "")}>
                <button className={`absolute bottom-6 left-6 right-6 text-black dark:text-white ${light} ${dark}`}>
                    {children}
                </button>
            </a>}
        </div>
    )
}