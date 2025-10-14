import { recover } from "../../api/user";
import { filledButton } from "../../data/classNames";
import type { Email } from "../../types";
import { AuthField } from "./AuthField";

interface ForgotFormProps {
    email?: string;
    setEmail?: (s: string) => void;
}

export const ForgotForm = ({
    email,
    setEmail
}: ForgotFormProps) => {
    return (
        <>
            <AuthField
                name="Email"
                type="email"
                id="recover-email"
                placeholder="your@email.com"
                value={email}
                setValue={setEmail}
            />
            <button
                className={"w-full " + filledButton}
                onClick={() => recover({
                    email: email as Email,
                    url: ""
                }).then(r => alert(r?.message ?? r?.error))}
            >
                Send recover mail
            </button>
        </>
    )
};