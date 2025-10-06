import { useEffect, useState } from "react";
import { Sidebar } from "../../components/dashboard/Sidebar";
import { Billing, type Plan } from "../../enums"
import type { NotificationResponse, UserResponse } from "../../types";
import { dashboardItems } from "../../data/dashboardItems";
import { getMe } from "../../api/user";
import { Header } from "../../components/dashboard/Header";
import { title } from "../../data/classNames";
import { PayPalProvider } from "../../components/pricing/PayPalProvider";
import { ButtonsWrapper } from "../../components/pricing/ButtonsWrapper";
import { plans } from "../../data/prices";
import { nullableInput } from "../../utils/nullableInput";

interface PayPalProps {
    plan?: Plan;
    billing?: Billing;
}

export const PayPal = ({
    plan,
    billing
}: PayPalProps) => {
    const [expanded, setExpanded] = useState(false);
    const [user, setUser] = useState<UserResponse | undefined>(undefined);
    const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
    const [search, setSearch] = useState("");
    const [active, setActive] = useState(false);
    useEffect(() => {
        getMe({}).then(setUser);
    }, []);
    return (
        <div className="size-full flex flex-col-reverse sm:flex-row justify-between h-screen sm:justify-start relative">
            <Sidebar
                expanded={expanded}
                setExpanded={setExpanded}
                items={dashboardItems}
                user={user}
            />
            <main className="flex flex-col w-full h-full top-0 absolute sm:relative">
                <Header
                    search={search}
                    setSearch={setSearch}
                    notifications={notifications}
                    setNotifications={setNotifications}
                    active={active}
                    setActive={setActive}
                >
                    <h1 className={"block text-[2em]! font-bold " + title}>Plans & Prices</h1>
                </Header>
                <div className="w-full h-full flex flex-col items-center justify-center p-10 sm:gap-10 overflow-y-scroll">
                    <PayPalProvider>
                        <ButtonsWrapper
                            planId={nullableInput(plan, p => plans.get(p))?.id?.get(billing ?? Billing.ANNUAL)}
                        />
                    </PayPalProvider>
                </div>
            </main>
        </div>
    )
}