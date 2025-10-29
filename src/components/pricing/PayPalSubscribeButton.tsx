import { useEffect, useRef } from "react";
import type { Billing, Plan } from "../../enums"
import { PAYPAL_ID } from "../../config";
import { plans } from "../../data/prices";

interface PayPalSubscribeButtonProps {
    plan?: Plan;
    billing?: Billing;
    onApprove?: (data: { subscriptionID: string }) => void;
    onError?: (error: any) => void;
    className?: string;
}

export const PayPalSubscriptionButton = ({
    plan,
    billing,
    onApprove,
    onError,
    className = ""
}: PayPalSubscribeButtonProps) => {
    const planId = (plan && billing) ? plans.get(plan)?.id?.get(billing) : undefined;
    if(!planId) return <></>;
    const buttonContainerRef = useRef<HTMLDivElement>(null);
    const isRendered = useRef(false);

    useEffect(() => {
        if(!window.paypal) {
            const script = document.createElement("script");
            script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_ID}&vault=true&intent=subscription`;
            script.setAttribute("data-sdk-integration-source", "button-factory");
            script.onload = () => renderPayPalButton();
            script.onerror = () => onError?.(undefined);
            document.body.appendChild(script);
        } else renderPayPalButton();
    }, [plan, billing]);

    const renderPayPalButton = () => {
        if(!window.paypal || !buttonContainerRef.current || isRendered.current) return;
        try {
            window.paypal.Buttons?.({
                style: {
                    shape: "pill",
                    color: "gold",
                    layout: "vertical",
                    label: "subscribe"
                },
                createSubscription: (_, actions) => actions.subscription.create({
                    plan_id: planId
                }),
                onApprove: async ({ subscriptionID }) => {
                    if(subscriptionID) onApprove?.({ subscriptionID });
                },
                onError: (err) => onError?.(err)
            }).render(buttonContainerRef.current);
            isRendered.current = true;
        } catch(error) {
            onError?.(error);
        }
    }

    return (
        <div className={`w-full max-w-xs mx-auto ${className}`}>
            <div
                ref={buttonContainerRef}
                id={`paypal-button-container-${plan}-${billing}`}
                className="paypal-button-container"
            />
        </div>
    )
}