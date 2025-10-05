import type { PayPalButtonCreateSubscription, PayPalButtonOnApprove } from "@paypal/paypal-js";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"

interface ButtonsWrapperProps {
    className?: string;
    disabled?: boolean;
    planId?: string;
    children?: any;
}

const onApprove: PayPalButtonOnApprove = async (_, actions) => {
    const { order } = actions;
    if(order) {
        const { payment_source } = await order.capture();
        alert(`Transaction completed by ${payment_source?.paypal?.name?.full_name}`);
    }
}

export const ButtonsWrapper = ({
    className,
    disabled,
    planId,
    children
}: ButtonsWrapperProps) => {
    const [{ isPending }] = usePayPalScriptReducer();
    if(isPending) return <div className="">Loading...</div>
    const createSubscription: PayPalButtonCreateSubscription = (_, actions) => actions.subscription.create({
        plan_id: planId ?? ""
    });
    return (
        <PayPalButtons
            fundingSource="paypal"
            className={className}
            disabled={disabled}
            createSubscription={createSubscription}
            onApprove={onApprove}
        >
            {children}
        </PayPalButtons>
    )
}