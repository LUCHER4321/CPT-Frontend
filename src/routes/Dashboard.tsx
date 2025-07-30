import { useEffect, useState } from "react";
import { dashboardItems } from "../data/dashboardItems";
import { Sidebar } from "../components/dashboard/Sidebar";
import { exampleTrees, exampleUsers } from "../data/example";
import { getMe, token } from "../api/user";
import { Header } from "../components/dashboard/Header";
import { getMyTrees, myTreesCount } from "../api/phTree";
import { getNotifications } from "../api/notification";
import type { NotificationResponse, PhTreeResponse } from "../types";
import { NotificationWS } from "../classes/NotificationWS";
import { socket } from "../api/socket";
import { TreesData } from "../components/dashboard/TreesData";
import { Order, TreeCriteria } from "../enums";
import { LastTrees } from "../components/dashboard/LastTrees";
import { title } from "../data/classNames";
import { DESIGN_MODE } from "../config";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
    const [expanded, setExpanded] = useState(false);
    const [user, setUser] = useState(exampleUsers[0]);
    const [trees, setTrees] = useState<number | undefined>(undefined);
    const [myTrees, setMyTrees] = useState<number | undefined>(undefined);
    const [collabs, setCollabs] = useState<number | undefined>(undefined);
    const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
    const [search, setSearch] = useState("");
    const [_, setNotificationWS] = useState<NotificationWS | undefined>(undefined);
    const [active, setActive] = useState(false);
    const [lastTrees, setLastTrees] = useState<PhTreeResponse[]>([]);
    const history = useNavigate();
    useEffect(() => {
        document.title = "Life Tree | Dashboard";
        getMe({}).then(u => {
            if(!DESIGN_MODE && !u) history("/");
            setUser(u ?? exampleUsers[0]);
            myTreesCount({}).then(t => {
                setTrees(t?.total ?? exampleTrees.filter(tr => tr.userId === exampleUsers[0].id || tr.collaborators?.includes(exampleUsers[0].id)).length);
                setMyTrees(t?.myTrees ?? exampleTrees.filter(tr => tr.userId === exampleUsers[0].id).length);
                setCollabs(t?.collabs ?? exampleTrees.filter(tr => tr.collaborators?.includes(exampleUsers[0].id)).length);
            });
            getMyTrees({
                limit: 3,
                criteria: TreeCriteria.UPDATED_AT,
                order: Order.DESC
            }).then(t => setLastTrees(t ?? exampleTrees.filter(({userId}) => userId === exampleUsers[0].id).slice(0, 3)));
            getNotifications({}).then(n => {
                setNotifications(n ?? []);
            });
            setNotificationWS(new NotificationWS({
                socket,
                response: nr => setNotifications(prev => prev.concat([nr])),
                userId: u?.id ?? ""
            }));
        });
        token({ expiresIn: "7d" });
    }, []);
    return (
        <div className="size-full flex flex-col-reverse sm:flex-row justify-between h-screen sm:justify-start">
            <Sidebar
                expanded={expanded}
                setExpanded={setExpanded}
                items={dashboardItems}
                currentPage="/"
                user={user}
            />
            <main className="flex flex-col w-full">
                <Header
                    search={search}
                    setSearch={setSearch}
                    count={notifications.filter(({seen}) => !seen).length}
                    active={active}
                    setActive={setActive}
                >
                    <h1 className={"block text-[2em]! font-bold " + title}>Welcome back, {user?.username}</h1>
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