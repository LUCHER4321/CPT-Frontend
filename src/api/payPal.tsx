import { Buffer } from "buffer";
import { PAYPAL_ID, PAYPAL_SECRET, PAYPAL_URL } from "../config";

const payPal = {
    pauseSubscriptions: async (planId?: string) => {
        if(!planId) return {
            completed: false,
        };
        try {
            const { access_token, error } = await payPal.getPayPalToken();
            if(!access_token) throw error;
            await fetch(`${PAYPAL_URL}/billing/subscriptions/${planId}/suspend`, {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access_token}`
                })
            });
            return {
                completed: true,
            }
        } catch(e) {
            return {
                completed: false,
                error: (e as Error).message
            };
        }
    },
    getPayPalToken: async () => {
        const credentials = Buffer.from(`${PAYPAL_ID}:${PAYPAL_SECRET}`).toString("base64");
        try {
            const response = await fetch(`${PAYPAL_URL}/oauth2/token`, {
                method: "POST",
                headers: {
                    "Authorization": `Basic ${credentials}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "grant_type=client_credentials"
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const { access_token } = await response.json() as {
                access_token: string;
            };
            return { access_token };
        } catch(error) {
            return { error };
        }
    }
};

export const {
    pauseSubscriptions,
    getPayPalToken
} = payPal;