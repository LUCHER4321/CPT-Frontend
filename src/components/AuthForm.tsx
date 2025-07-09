import { aText, filledButton } from "../data/classNames"
import { plans } from "../data/prices";
import { Billing, Plan } from "../enums";
import { AuthField } from "./AuthField"
import { AuthHeader } from "./AuthHeader";
import { LinkButton } from "./LinkButton";

interface LoginFormProps {
    email?: string;
    setEmail?: (s: string) => void;
    password?: string;
    setPassword?: (s: string) => void;
    visiblePassword?: boolean;
    setVisiblePassword?: (b: boolean) => void;
    className?: string;
    setRegister?: (b: boolean) => void;
}

export const LoginForm = ({
    email,
    setEmail,
    password,
    setPassword,
    visiblePassword,
    setVisiblePassword,
    className,
    setRegister
}: LoginFormProps) => {
    return (
        <>
            <AuthHeader
                title="Log In"
                subTitle="Welcome back"
                className={className}
            />
            <form className={className}>
                <AuthField
                    name="Email"
                    type="email"
                    id="login-email"
                    placeholder="your@email.com"
                    value={email}
                    setValue={setEmail}
                />
                <AuthField
                    name="Password"
                    type={visiblePassword ? "text" : "password"}
                    id="login-password"
                    placeholder="••••••••"
                    value={password}
                    setValue={setPassword}
                    visiblePassword={visiblePassword}
                    setVisiblePassword={setVisiblePassword}
                >
                    <div className="w-full text-end mt-[0.5rem]">
                        <a className={aText}>Forgot your password?</a>
                    </div>
                </AuthField>
                <LinkButton className={"w-full " + filledButton}>Log In</LinkButton>
                <div className="w-full text-center mt-[1.5rem]">
                    <p>No account? <a className={aText} onClick={() => setRegister?.(true)}>Register</a></p>
                </div>
            </form>
        </>
    )
}

interface RegisterFormProps {
    username?: string;
    setUsername?: (s: string) => void;
    email?: string;
    setEmail?: (s: string) => void;
    password?: string;
    setPassword?: (s: string) => void;
    visiblePassword?: boolean;
    setVisiblePassword?: (b: boolean) => void;
    confirmPassword?: string;
    setConfirmPassword?: (s: string) => void;
    accept?: boolean;
    setAccept?: (b: boolean) => void;
    className?: string;
    setRegister?: (b: boolean) => void;
    plan?: Plan;
    setPlan?: (p: Plan) => void;
    billing?: Billing;
    setBilling?: (b: Billing) => void;
}

export const RegisterForm = ({
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    visiblePassword,
    setVisiblePassword,
    confirmPassword,
    setConfirmPassword,
    accept,
    setAccept,
    className,
    setRegister,
    plan,
    setPlan,
    billing,
    setBilling
}: RegisterFormProps) => {
    return (
        <>
            <AuthHeader
                title="Register"
                subTitle="Create your Life Tree account"
                className={className}
            />
            <form className={className}>
                <AuthField
                    name="Username"
                    type="text"
                    id="register-username"
                    placeholder="ej: biolab_user"
                    value={username}
                    setValue={setUsername}
                />
                <AuthField
                    name="Email"
                    type="email"
                    id="register-email"
                    placeholder="your@email.com"
                    value={email}
                    setValue={setEmail}
                />
                <AuthField
                    name="Password"
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
                <AuthField
                    name="Choose your plan"
                    id="plan"
                    selected={plan}
                    options={[Plan.FREE, Plan.PRO, Plan.PREMIUM]}
                    setSelected={setPlan}
                >
                    <p className="w-full text-end">Check our <a href="/pricing" className={aText} target="_blank">plans</a> options</p>
                </AuthField>
                {plan && plan !== Plan.FREE && <>
                    <AuthField
                        name="Billing Method"
                        id="billing-method"
                        selected={billing}
                        options={[Billing.MONTHLY, Billing.ANNUAL]}
                        setSelected={setBilling}
                    >
                        <p className="font-bold mb-2">Total Cost: ${(billing === Billing.MONTHLY ? plans.get(plan)?.month : plans.get(plan)?.year)?.toFixed(2)}/{billing === Billing.MONTHLY ? "month" : `year ($${plans.get(plan)?.year.toFixed(2)}/month)`}</p>
                    </AuthField>
                </>}
                <p className="mb-6"><input
                    type="checkbox"
                    id="register-accept"
                    checked={accept}
                    onChange={e => setAccept?.(e.target.checked)}
                    className="mr-1 cursor-pointer"
                /> Accept <a className={aText}>Terms & Conditions</a></p>
                <LinkButton className={"w-full " + filledButton}>Register</LinkButton>
                <div className="w-full text-center mt-[1.5rem] pb-[1.5rem]">
                    <p>Already have an account? <a className={aText} onClick={() => setRegister?.(false)}>Log In</a></p>
                </div>
            </form>
        </>
    )
};