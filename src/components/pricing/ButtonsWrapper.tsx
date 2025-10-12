import type { PayPalButtonCreateSubscription, PayPalButtonOnApprove } from "@paypal/paypal-js";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"

interface ButtonsWrapperProps {
    className?: string;
    disabled?: boolean;
    planId?: string;
    onApprove?: PayPalButtonOnApprove;
    children?: any;
}

const onApprove0: PayPalButtonOnApprove = async (_, actions) => {
    const { order } = actions;
    if(order) {
        const { full_name } = (await order.capture()).payment_source?.paypal?.name ?? {};
        alert(`Transaction completed by ${full_name}`);
    }
}

export const ButtonsWrapper = ({
    className,
    disabled = false,
    planId,
    onApprove = onApprove0,
    children
}: ButtonsWrapperProps) => {
    const [{ isPending, isRejected }] = usePayPalScriptReducer();
    if(isPending) return <div className="">Loading...</div>;
    if(isRejected) return <div className="">Error loading PayPal</div>;
    if (!planId) {
        return <div className="">Plan ID not available</div>;
    }

    const createSubscription: PayPalButtonCreateSubscription = async (_, actions) => {
        console.log("Creating subscription with plan:", planId);
        return await actions.subscription.create({
            plan_id: planId
        });
    }
    
    return (
        <PayPalButtons
            fundingSource="paypal"
            className={className}
            style={{
                layout: "vertical",
                shape: "rect",
                label: "subscribe",
                height: 45
            }}
            disabled={disabled || !planId}
            createSubscription={createSubscription}
            onApprove={onApprove}
            onError={(err) => {
                console.error("PayPal Button Error:", err);
                alert("Payment error: " + JSON.stringify(err));
            }}
        >
            {children}
        </PayPalButtons>
    )
}