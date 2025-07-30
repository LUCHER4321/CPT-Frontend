import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
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
import { TreeChange, TreeProp } from "../../enums";
import { TreeVisualization } from "../../components/dashboard/trees/TreeVisualization";
import { TreeProperties } from "../../components/dashboard/trees/TreeProperties";

export const TreeEditor = () => {
    const [expanded, setExpanded] = useState(false);
    const [tree, setTree] = useState<PhTreeResponse | undefined>(undefined);
    const [user, setUser] = useState<UserResponse | undefined>(undefined);
    const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
    const [search, setSearch] = useState("");
    const [active, setActive] = useState(false);
    const [name, setName] = useState("");
    const [_, setNotificationWS] = useState<NotificationWS | undefined>(undefined);
    const [__, setPhTreeWS] = useState<PhTreeWS | undefined>(undefined);
    const [chronoScale, setChronoScale] = useState(true);
    const [prop, setProp] = useState(TreeProp.TREE);
    const { id } = useParams();
    const history = useNavigate();
    useEffect(() => {
        if(id) getMe({}).then(u => {
            setUser(u);
            getTree({ id }).then(t => {
                if(t) {
                    setTree(t);
                    setName(t.name);
                    setPhTreeWS(new PhTreeWS({
                        socket,
                        response: ({change, phTree, species}) => {
                            switch (change) {
                                case TreeChange.NEW:
                                    if(!species) return;
                                    break;
                                case TreeChange.EDIT:
                                    if(!species) return;
                                    break;
                                case TreeChange.DELETE:
                                    if(!species) return;
                                    break;
                                case TreeChange.TREE:
                                    if(!phTree) return;
                                    break;
                            }
                        },
                        treeId: t.id
                    }));
                    if(u?.id && ![...(t.collaborators ?? []), t.userId].includes(u.id)) {
                        if(u) history("/account");
                        else history("/");
                    };
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
            <div className="flex flex-row size-full overflow-hidden">
                <TreeVisualization
                    chronoScale={chronoScale}
                    setChronoScale={setChronoScale}
                >
                    TreeVisualization
                </TreeVisualization>
                <TreeProperties
                    prop={prop}
                    setProp={setProp}
                >
                    TreeProperties
                </TreeProperties>
            </div>
        </main>
    </div>)
}