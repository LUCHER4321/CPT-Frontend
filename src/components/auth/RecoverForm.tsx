import { resetPassword } from "../../api/user";
import { filledButton } from "../../data/classNames";
import type { Email } from "../../types";
import { AuthField } from "./AuthField";

interface RecoverFormProps {
    email?: string;
    setEmail?: (s: string) => void;
    password?: string;
    setPassword?: (s: string) => void;
    visiblePassword?: boolean;
    setVisiblePassword?: (b: boolean) => void;
    confirmPassword?: string;
    setConfirmPassword?: (s: string) => void;
    token?: string;
    goToAuth?: () => void;
}

export const RecoverForm = ({
    email,
    setEmail,
    password,
    setPassword,
    visiblePassword,
    setVisiblePassword,
    confirmPassword,
    setConfirmPassword,
    token,
    goToAuth
}: RecoverFormProps) => {
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
            <AuthField
                name="New Password"
                type={visiblePassword ? "text" : "password"}
                id="register-password"
                placeholder="••••••••"
                value={password}
                setValue={setPassword}
                visiblePassword={visiblePassword}
                setVisiblePassword={setVisiblePassword}
            />
            <AuthField
                name="Confirm Password"
                type={visiblePassword ? "text" : "password"}
                id="register-confirm-password"
                placeholder="••••••••"
                value={confirmPassword}
                setValue={setConfirmPassword}
                visiblePassword={visiblePassword}
                setVisiblePassword={setVisiblePassword}
            />
            <button
                className={"w-full " + filledButton}
                onClick={() => {
                    if(!token || !password?.length || !confirmPassword?.length || !email?.length) return;
                    if(password !== confirmPassword) return alert("Passwords don't match");
                    resetPassword({
                        token,
                        password,
                        email: email as Email
                    }).then(u => {
                        if(u?.error) return alert(u.error);
                        goToAuth?.();
                    });
                }}
            >
                Reset your password
            </button>
        </>
    )
}