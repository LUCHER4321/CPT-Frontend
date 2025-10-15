import { useState } from "react";
import { HomeNavBar } from "../../components/home/HomeNavBar";
import { title } from "../../data/classNames";
import { AuthBanner } from "../../components/auth/AuthBanner";
import { RecoverForm } from "../../components/auth/RecoverForm";
import { useNavigate, useParams } from "react-router-dom";
import { Footer } from "../../components/Footer";

export const RecoverPassword = () => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [passwordC, setPasswordC] = useState("");
    const [name, setName] = useState("");
    const [emailC, setEmailC] = useState("");
    const [message, setMessage] = useState("");
    const { token } = useParams();
    const history = useNavigate();
    return (
        <>
            <HomeNavBar
                open={open}
                setOpen={setOpen}
                search={search}
                setSearch={setSearch}
            />
            <div className="flex flex-col sm:flex-row w-screen sm:min-h-[100vh] p-0!">
                <div className="sm:min-w-125 px-8 py-12 flex flex-col">
                    <h1 className={"text-center mb-10 " + title}>Create a new password</h1>
                    <RecoverForm
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        visiblePassword={visiblePassword}
                        setVisiblePassword={setVisiblePassword}
                        confirmPassword={passwordC}
                        setConfirmPassword={setPasswordC}
                        token={token}
                        goToAuth={() => history("/auth")}
                    />
                </div>
                <AuthBanner/>
            </div>
            <Footer
                id="footer"
                name={name}
                setName={setName}
                email={emailC}
                setEmail={setEmailC}
                message={message}
                setMessage={setMessage}
            />
        </>
    )
}