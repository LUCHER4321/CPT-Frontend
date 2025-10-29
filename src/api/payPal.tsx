import { Buffer } from "buffer";
import { PAYPAL_ID, PAYPAL_SECRET, PAYPAL_URL } from "../config";

interface PayPalSubscriptionDetails {
  id: string;
  status: 'APPROVAL_PENDING' | 'APPROVED' | 'ACTIVE' | 'SUSPENDED' | 'CANCELLED' | 'EXPIRED';
  status_update_time: string;
  plan_id: string;
  start_time: string;
  quantity: string;
  shipping_amount: {
    currency_code: string;
    value: string;
  };
  subscriber: {
    email_address: string;
    payer_id: string;
    name: {
      given_name: string;
      surname: string;
    };
  };
  billing_info: {
    outstanding_balance: {
      currency_code: string;
      value: string;
    };
    cycle_executions: Array<{
      tenure_type: string;
      sequence: number;
      cycles_completed: number;
      cycles_remaining: number;
      current_pricing_scheme_version: number;
    }>;
    last_payment: {
      amount: {
        currency_code: string;
        value: string;
      };
      time: string;
    };
    next_billing_time: string;
    final_payment_time?: string;
    failed_payments_count: number;
  };
}

const payPal = {
    checkSubscription: async (subId?: string) => {
        try {
            const { access_token, error } = await payPal.getPayPalToken();
            if(!access_token) throw error;
            const response = await fetch(`${PAYPAL_URL}/billing/subscriptions/${subId}`, {
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json"
                }
            });
            if(!response.ok) throw new Error(`Error getting subscription state: ${response.statusText}`);
            const { status }: PayPalSubscriptionDetails = await response.json();
            return ['APPROVED', 'ACTIVE'].includes(status);
        } catch(e) {
            return { error: (e as Error).message };
        }
    },
    pauseSubscriptions: async (subId?: string, reason?: string) => {
        if(!subId) return {
            completed: false,
        };
        try {
            const { access_token, error } = await payPal.getPayPalToken();
            if(!access_token) throw error;
            await fetch(`${PAYPAL_URL}/billing/subscriptions/${subId}/cancel`, {
                method: "POST",
                headers: new Headers({
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify({
                    reason
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
    checkSubscription,
    pauseSubscriptions,
    getPayPalToken
} = payPal;