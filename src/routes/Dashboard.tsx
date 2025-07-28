import { useEffect, useState } from "react";
import { dashboardItems } from "../data/dashboardItems";
import { Sidebar } from "../components/dashboard/Sidebar";
import { exampleUsers } from "../data/example";
import { getMe } from "../api/user";
import { Header } from "../components/dashboard/Header";
import { getMyTrees, myTreesCount } from "../api/phTree";
import { getNotifications } from "../api/notification";
import type { NotificationResponse, PhTreeResponse } from "../types";
import { NotificationWS } from "../classes/NotificationWS";
import { socket } from "../api/socket";
import { TreesData } from "../components/dashboard/TreesData";
import { Order, TreeCriteria } from "../enums";
import { LastTrees } from "../components/dashboard/LastTrees";

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
    useEffect(() => {
        document.title = "Life Tree | Dashboard";
        getMe({}).then(u => {
            setUser(u ?? exampleUsers[0]);
            myTreesCount({}).then(t => {
                if(t) {
                    setTrees(t.total);
                    setMyTrees(t.myTrees);
                    setCollabs(t.collabs);
                }
            });
            getMyTrees({
                limit: 3,
                criteria: TreeCriteria.UPDATED_AT,
                order: Order.DESC
            }).then(t => setLastTrees(t ?? []));
            getNotifications({
                from: new Date(Date.now() - 1000 * 60 * 60 * 24 * 365.25),
                to: new Date()
            }).then(n => {
                setNotifications(n ?? []);
            });
            setNotificationWS(new NotificationWS({
                socket,
                response: nr => setNotifications(prev => prev.concat([nr])),
                userId: u?.id ?? ""
            }))
        });
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
                    count={notifications.map(n => !n.seen).length}
                    active={active}
                    setActive={setActive}
                />
                <div className="w-full h-full content-center grid grid-cols-1 sm:grid-cols-3 gap-5 sm:px-10 sm:gap-10 overflow-y-scroll">
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