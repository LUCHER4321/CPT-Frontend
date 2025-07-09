import { useEffect, useState } from "react"
import { LoginForm, RegisterForm } from "../components/AuthForm";
import { AuthBanner } from "../components/AuthBanner";
import { HomeNavBar } from "../components/HomeNavBar";
import { Billing, Plan } from "../enums";

interface AuthProps {
    initialRegister?: boolean;
    initialPlan?: Plan;
    initialBilling?: Billing
}

export const Auth = ({
    initialRegister = false,
    initialPlan = Plan.FREE,
    initialBilling = Billing.ANNUAL
}: AuthProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [register, setRegister] = useState(initialRegister);
    const [visiblePasswordR, setVisiblePasswordR] = useState(false);
    const [username, setUsername] = useState("");
    const [emailR, setEmailR] = useState("");
    const [passwordR, setPasswordR] = useState("");
    const [passwordC, setPasswordC] = useState("");
    const [accept, setAccept] = useState(false);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [plan, setPlan] = useState(initialPlan);
    const [billing, setBilling] = useState(initialBilling);
    useEffect(() => {
        document.title = `Life Tree | ${register ? "Register" : "Log In"}`
    }, [register]);
    return (
        <>
            <HomeNavBar
                open={open}
                setOpen={setOpen}
                search={search}
                setSearch={setSearch}
            />
            <div className="flex flex-col sm:flex-row w-screen sm:min-h-[100vh] p-0!">
                <div className="sm:min-w-125 px-8 py-12">
                    <LoginForm
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        visiblePassword={visiblePassword}
                        setVisiblePassword={setVisiblePassword}
                        className={register ? "hidden" : ""}
                        setRegister={setRegister}
                    />
                    <RegisterForm
                        username={username}
                        setUsername={setUsername}
                        email={emailR}
                        setEmail={setEmailR}
                        password={passwordR}
                        setPassword={setPasswordR}
                        confirmPassword={passwordC}
                        setConfirmPassword={setPasswordC}
                        visiblePassword={visiblePasswordR}
                        setVisiblePassword={setVisiblePasswordR}
                        accept={accept}
                        setAccept={setAccept}
                        className={register ? "" : "hidden"}
                        setRegister={setRegister}
                        plan={plan}
                        setPlan={setPlan}
                        billing={billing}
                        setBilling={setBilling}
                    />
                </div>
                <AuthBanner/>
            </div>
        </>
    )
}