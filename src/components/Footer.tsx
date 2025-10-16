import { contact } from "../api/contact";
import { aText, filledButton, title } from "../data/classNames"
import type { Email } from "../types";
import { AuthField } from "./auth/AuthField";

interface FooterProps {
    id?: string;
    className?: string;
    name?: string;
    setName?: (s: string) => void;
    email?: string;
    setEmail?: (s: string) => void;
    message?: string;
    setMessage?: (s: string) => void;
}

interface LiLinkProps {
    href?: string;
    blank?: boolean;
    children?: any;
}

export const Footer = ({
    id,
    className,
    name,
    setName,
    email,
    setEmail,
    message,
    setMessage
}: FooterProps) => {
    const LiLink = ({ href, blank, children }: LiLinkProps) => <li><a href={href} target={blank ? "_blank" : undefined} className={aText}>{children}</a></li>
    return (
        <footer id={id} className={"bg-[#D8EDD9] dark:bg-[#1B5E20] px-4 sm:px-28 py-8 " + className}>
            <div className="grid grid-cols-1 sm:grid-cols-3 pb-6 gap-4">
                <div>
                    <h2 className={"text-lg mb-4 " + title}>
                        About Us
                    </h2>
                    <p>
                        Create, share and collaborate in phylogenetic trees with the community
                    </p>
                </div>
                <div>
                    <h2 className={"text-lg mb-4 " + title}>
                        Quick Links
                    </h2>
                    <ul>
                        <LiLink href="/">Home</LiLink>
                        <LiLink href="/pricing">Pricing</LiLink>
                        <LiLink href="/trees">Search Trees</LiLink>
                        <LiLink href="https://discord.gg/s9cJJHcnA4" blank>Discord Server</LiLink>
                    </ul>
                </div>
                <div>
                    <h2 className={"text-lg mb-4 " + title}>
                        Contact Us
                    </h2>
                    <form>
                        <AuthField
                            name="Name or Institution"
                            type="text"
                            placeholder="Your name or your institution's name"
                            value={name}
                            setValue={setName}
                        />
                        <AuthField
                            name="Email"
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            setValue={setEmail}
                        />
                        <AuthField
                            name="Message"
                            textArea
                            placeholder="Message"
                            value={message}
                            setValue={setMessage}
                        />
                        <div className="flex flex-col items-end">
                            <button type="button" className={filledButton} onClick={() => contact({
                                name,
                                email: email as Email | undefined,
                                message
                            }).then(r => alert(r?.message ?? r?.error))}>
                                Submit <i className="fas fa-arrow-right"/>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="border-t pt-4 text-center">
                <p>© {new Date().getFullYear()} Life Tree. All rights reserved.</p>
            </div>
        </footer>
    )
}