import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PAYPAL_ID } from "../../config";

interface PayPalProviderProps {
    children?: any;
}

export const PayPalProvider = ({
    children
}: PayPalProviderProps) => {
    return (
        <PayPalScriptProvider
            options={{
                clientId: PAYPAL_ID,
                components: "buttons",
                currency: "USD",
                vault: true,
                intent: "subscription"
            }}
        >
            {children}
        </PayPalScriptProvider>
    )
}