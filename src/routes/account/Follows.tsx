import { useEffect, useState } from "react";
import { Sidebar } from "../../components/dashboard/Sidebar"
import { accountContainer, title } from "../../data/classNames"
import { dashboardItems } from "../../data/dashboardItems";
import type { NotificationResponse, UserResponse } from "../../types";
import { getMe, token } from "../../api/user";
import { Header } from "../../components/dashboard/Header";
import { getNotifications } from "../../api/notification";
import { getFollowers, getFollowing } from "../../api/follow";
import { notificationService } from "../../classes/NotificationService";
import { UsersData } from "../../components/dashboard/follows/UsersData";
import { Footer } from "../../components/Footer";

interface FollowsProps {
    showFollowers?: boolean;
    showFollowing?: boolean;
}

export const Follows = ({
    showFollowers,
    showFollowing
}: FollowsProps) => {
    const [expanded, setExpanded] = useState(false);
    const [user, setUser] = useState<UserResponse | undefined>(undefined);
    const [following, setFollowing] = useState<UserResponse[]>([]);
    const [followers, setFollowers] = useState<UserResponse[]>([]);
    const [search, setSearch] = useState("");
    const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
    const [active, setActive] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    useEffect(() => {
        getMe({}).then(u => {
            setUser(u);
            if(showFollowers) getFollowers({ userId: u?.id ?? "" }).then(f => setFollowers(f ?? []));
            if(showFollowing) getFollowing({ userId: u?.id ?? "" }).then(f => setFollowing(f ?? []));
            getNotifications({}).then(n => {
                setNotifications(n ?? []);
            });
            notificationService.initialize({
                response: nr => setNotifications([nr, ...notifications]),
                userId: u?.id ?? ""
            });
            token({ expiresIn: "7d" });
        });
    }, []);
    return <>
        <div className={accountContainer}>
            <Sidebar
                expanded={expanded}
                setExpanded={setExpanded}
                items={dashboardItems}
                user={user}
                currentPage="/follows"
            />
            <main className="flex flex-col w-full h-full">
                <Header
                    search={search}
                    setSearch={setSearch}
                    notifications={notifications}
                    setNotifications={setNotifications}
                    active={active}
                    setActive={setActive}
                >
                    <div className="flex flex-row space-x-7 text-2xl justify-between">
                        <h2 className={"text-2xl " + title}>{user?.username}'s {showFollowers && showFollowing ? "follows" : showFollowers ? "followers" : showFollowing ? "following" : ""}</h2>
                    </div>
                </Header>
                <div className="overflow-y-scroll">
                    <div className="grid grid-cols-1 sm:grid-cols-3 p-10 gap-5 min-h-full">
                        {showFollowers && followers.length > 0 && <UsersData
                            titleText="Followers"
                            users={followers}
                        />}
                        {showFollowing && following.length > 0 && <UsersData
                            titleText="Following"
                            users={following}
                        />}
                    </div>
                    <Footer
                        id="footer"
                        name={name}
                        setName={setName}
                        email={email}
                        setEmail={setEmail}
                        message={message}
                        setMessage={setMessage}
                    />
                </div>
            </main>
        </div>
    </>
}