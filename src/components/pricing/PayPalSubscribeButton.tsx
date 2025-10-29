import { useEffect, useRef, useState } from "react";
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
    const buttonContainerRef = useRef<HTMLDivElement>(null);
    const isRendered = useRef(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(!planId) return;
        isRendered.current = false;
        if(!window.paypal) {
            const script = document.createElement("script");
            script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_ID}&vault=true&intent=subscription`;
            script.setAttribute("data-sdk-integration-source", "button-factory");
            script.onload = () => {
                setIsLoading(false);
                renderPayPalButton();
            }
            script.onerror = () => {
                onError?.("Failed to load PayPal SDK");
            }
            document.body.appendChild(script);
        } else {
            setIsLoading(false);
            renderPayPalButton();
        }

        return () => {
            if(buttonContainerRef.current) buttonContainerRef.current.innerHTML = "";
        }
    }, [plan, billing, planId]);

    const renderPayPalButton = () => {
        if(!window.paypal || !buttonContainerRef.current || isRendered.current || !planId) return;
        try {
            buttonContainerRef.current.innerHTML = "";
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

    if (!planId) return <div>Plan not available</div>;

    return (
        <div className={`w-full max-w-xs mx-auto ${className}`}>
            {isLoading && <div>Loading PayPal...</div>}
            <div
                ref={buttonContainerRef}
                id={`paypal-button-container-${plan}-${billing}`}
                className="paypal-button-container"
                key={`paypal-${plan}-${billing}`}
            />
        </div>
    )
}