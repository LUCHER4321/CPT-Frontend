import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import type { NotificationResponse, PhTreeResponse, UserResponse } from "../../types";
import { getTree } from "../../api/phTree";
import { getMe } from "../../api/user";
import { Header } from "../../components/dashboard/Header";
import { title } from "../../data/classNames";
import { getNotifications } from "../../api/notification";
import { Sidebar } from "../../components/dashboard/Sidebar";
import { dashboardItems } from "../../data/dashboardItems";
import { NotificationWS } from "../../classes/NotificationWS";
import { socket } from "../../api/socket";
import { PhTreeWS } from "../../classes/PhTreeWS";

export const TreeEditor = () => {
    const [expanded, setExpanded] = useState(false);
    const [tree, setTree] = useState<PhTreeResponse | undefined>(undefined);
    const [user, setUser] = useState<UserResponse | undefined>(undefined);
    const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
    const [search, setSearch] = useState("");
    const [active, setActive] = useState(false);
    const [name, setName] = useState("");
    const [_, setNotificationWS] = useState<NotificationWS | undefined>(undefined);
    const [__, setPhTreeWS] = useState<PhTreeWS | undefined>(undefined)
    const { id } = useParams();
    useEffect(() => {
        if(id) getMe({}).then(u => {
            setUser(u);
            getTree({ id }).then(t => {
                if(t) {
                    setTree(t);
                    setName(t.name);
                    setPhTreeWS(new PhTreeWS({
                        socket,
                        response: () => {},
                        treeId: t.id
                    }))
                }
            });
            getNotifications({}).then(n => {
                setNotifications(n ?? []);
            });
            setNotificationWS(new NotificationWS({
                socket,
                response: nr => setNotifications(prev => prev.concat([nr])),
                userId: u?.id ?? ""
            }));
        });
    }, []);
    return (
    <div className="size-full flex flex-col-reverse sm:flex-row justify-between h-screen sm:justify-start">
        <Sidebar
            expanded={expanded}
            setExpanded={setExpanded}
            items={dashboardItems}
            currentPage={user?.id === tree?.userId ? "/trees/me" : user?.id && tree?.collaborators?.includes(user?.id) ? "/trees/collabs" : "/"}
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
                <div className="flex flex-row space-x-7 text-2xl">
                    <a href="/account">
                        <i className={"fas fa-arrow-left " + title}/>
                    </a>
                    <input
                        className={title}
                        type="text"
                        value={name}
                        onChange={e => setName?.(e.target.value)}
                        placeholder="Tree Name"
                    />
                </div>
            </Header>
        </main>
    </div>)
}