import { useEffect, useState } from "react";
import { dashboardItems } from "../data/dashboardItems";
import { Sidebar } from "../components/dashboard/Sidebar";
import { getMe, getUser, token } from "../api/user";
import { Header } from "../components/dashboard/Header";
import { getMyTrees, myTreesCount } from "../api/phTree";
import { getNotifications } from "../api/notification";
import type { NotificationResponse, PhTreeResponse, UserResponse } from "../types";
import { TreesData } from "../components/dashboard/TreesData";
import { Order, TreeCriteria } from "../enums";
import { LastTrees } from "../components/dashboard/LastTrees";
import { aText, title } from "../data/classNames";
import { DESIGN_MODE } from "../config";
import { useNavigate } from "react-router-dom";
import { getFollowersCount, getFollowing } from "../api/follow";
import { notificationService } from "../classes/NotificationService";

export const Dashboard = () => {
    const [expanded, setExpanded] = useState(false);
    const [user, setUser] = useState<UserResponse | undefined>(undefined);
    const [trees, setTrees] = useState<number | undefined>(undefined);
    const [myTrees, setMyTrees] = useState<number | undefined>(undefined);
    const [collabs, setCollabs] = useState<number | undefined>(undefined);
    const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
    const [search, setSearch] = useState("");
    const [active, setActive] = useState(false);
    const [lastTrees, setLastTrees] = useState<(PhTreeResponse & { username: string })[]>([]);
    const [follows, setFollows] = useState<{
        following?: UserResponse[];
        followers?: number;
    }>({})
    const history = useNavigate();
    useEffect(() => {
        getMe({}).then(u => {
            if(!DESIGN_MODE && !u) history("/");
            setUser(u);
            document.title = `Life Tree | ${u?.username} Dashboard`;
            if(u) getFollowing({ userId: u.id }).then(fl => getFollowersCount({ userId: u.id }).then(f => setFollows({
                following: fl,
                followers: f?.count
            })));
            myTreesCount({}).then(t => {
                setTrees(t?.total);
                setMyTrees(t?.myTrees);
                setCollabs(t?.collabs);
            });
            getMyTrees({
                limit: 3,
                criteria: TreeCriteria.UPDATED_AT,
                order: Order.DESC
            }).then(t => Promise.all(t?.trees.map(async (tree) => ({
                ...tree,
                username: (await getUser({ id: tree.userId }))?.username ?? ""
            })) ?? [])).then(setLastTrees);
            getNotifications({}).then(n => {
                setNotifications(n ?? []);
            });
            notificationService.initialize({
                response: nr => setNotifications([nr, ...notifications]),
                userId: u?.id ?? ""
            });
        });
        token({ expiresIn: "7d" });
    }, []);
    return (
        <div className="size-full flex flex-col-reverse sm:flex-row justify-between h-screen sm:justify-start relative">
            <Sidebar
                expanded={expanded}
                setExpanded={setExpanded}
                items={dashboardItems}
                currentPage="/"
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
                    <div className="flex flex-col">
                        <h1 className={"block text-[2em]! font-bold " + title}>Welcome back, {user?.username}</h1>
                        <p className={"block font-bold " + title}><a href="/account/follows/following" className={aText}>{follows.following?.length} Following</a>, <a href="/account/follows/followers" className={aText}>{follows.followers} Followers</a></p>
                    </div>
                </Header>
                <div className="w-full h-full grid grid-cols-1 sm:grid-cols-3 gap-5 p-10 sm:gap-10 overflow-y-scroll">
                    <TreesData
                        trees={trees}
                        myTrees={myTrees}
                        collabs={collabs}
                    />
                    <LastTrees
                        lastTrees={lastTrees}
                    />
                </div>
            </main>
        </div>
    )
};