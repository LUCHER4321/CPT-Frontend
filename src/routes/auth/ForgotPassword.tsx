import { useState } from "react";
import { HomeNavBar } from "../../components/home/HomeNavBar";
import { AuthBanner } from "../../components/auth/AuthBanner";
import { title } from "../../data/classNames";
import { ForgotForm } from "../../components/auth/ForgotForm";
import { Footer } from "../../components/Footer";

export const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [name, setName] = useState("");
    const [emailC, setEmailC] = useState("");
    const [message, setMessage] = useState("");
    return (
        <>
            <HomeNavBar
                open={open}
                setOpen={setOpen}
                search={search}
                setSearch={setSearch}
            />
            <div className="flex flex-col sm:flex-row w-screen sm:min-h-[100vh] p-0!">
                <div className="sm:min-w-125 px-8 py-12 flex flex-col justify-center relative">
                    <h1 className={"absolute top-12 right-8 left-8 text-center " + title}>Forgot your password?</h1>
                    <ForgotForm
                        email={email}
                        setEmail={setEmail}
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