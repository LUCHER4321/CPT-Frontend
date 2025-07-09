import { selectedBilling, unselectedBilling } from "../data/classNames";
import { ToggleSwitch } from "./ToggleSwitch";

interface BillingToggleProps {
    monthly?: boolean;
    setMonthly?: (b: boolean) => void;
}

export const BillingToggle = ({
    monthly,
    setMonthly
}: BillingToggleProps) => {
    return (
        <div className="flex flex-row mb-[2rem] space-x-[1rem]">
            <span className={"relative " + (monthly ? unselectedBilling : selectedBilling)}>
                Annual Billing
                <div className="bg-[#FFA000] absolute -top-1/2 -left-3/5 rounded-full px-[0.75rem] py-[0.25rem] text-xs">Save 20%</div>
            </span>
            <ToggleSwitch
                id={"monthly"}
                checked={monthly}
                onChange={setMonthly}
                className={"w-15 " + (monthly ? "bg-[#D8EDD9] dark:bg-[#1B5E20]" : "bg-neutral-200 dark:bg-neutral-700")}
                spanClassName="bg-white"
            />
            <span className={monthly ? selectedBilling : unselectedBilling}>
                Monthly Billing
            </span>
        </div>
    )
}