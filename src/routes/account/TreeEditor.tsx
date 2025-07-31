import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import type { NotificationResponse, PhTreeResponse, UserResponse } from "../../types";
import { getTree, imageTree, viewTree } from "../../api/phTree";
import { getMe } from "../../api/user";
import { Header } from "../../components/dashboard/Header";
import { title } from "../../data/classNames";
import { getNotifications } from "../../api/notification";
import { Sidebar } from "../../components/dashboard/Sidebar";
import { dashboardItems } from "../../data/dashboardItems";
import { NotificationWS } from "../../classes/NotificationWS";
import { socket } from "../../api/socket";
import { PhTreeWS } from "../../classes/PhTreeWS";
import { TimeUnit, TreeChange, TreeProp } from "../../enums";
import { TreeVisualization } from "../../components/dashboard/trees/TreeVisualization";
import { TreeProperties } from "../../components/dashboard/trees/TreeProperties";
import { TreeProps } from "../../components/dashboard/trees/TreeProps";
import { NodeProps } from "../../components/dashboard/trees/NodeProps";
import type { Species } from "chrono-phylo-tree";
import { speciesImage } from "../../api/species";
import { useDropzone } from "react-dropzone";

export const TreeEditor = () => {
    const [expanded, setExpanded] = useState(false);
    const [tree, setTree] = useState<PhTreeResponse | undefined>(undefined);
    const [species, setSpecies] = useState<Species | undefined>(undefined);
    const [unit, setUnit] = useState(TimeUnit.Y);
    const [user, setUser] = useState<UserResponse | undefined>(undefined);
    const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
    const [search, setSearch] = useState("");
    const [active, setActive] = useState(false);
    const [_, setNotificationWS] = useState<NotificationWS | undefined>(undefined);
    const [phTreeWS, setPhTreeWS] = useState<PhTreeWS | undefined>(undefined);
    const [chronoScale, setChronoScale] = useState(true);
    const [prop, setProp] = useState(TreeProp.TREE);
    const [tag, setTag] = useState("");
    const { id } = useParams();
    const history = useNavigate();

    const onDrop = useCallback((files?: File[]) => {
        const [image] = files ?? [undefined];
        if(id && image) switch(prop) {
            case TreeProp.TREE: imageTree({ id, image }).then(t => {
                    if(t) setTree(t);
                });
                break;
            case TreeProp.NODE: if(species?.id) speciesImage({ treeId: id, id: species.id.toString(), image });
                break;
            case TreeProp.COLLABORATORS:
                break;
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    useEffect(() => {
        if(id) getMe({}).then(u => {
            setUser(u);
            getTree({ id }).then(t => {
                if(t) {
                    setTree(t);
                    setPhTreeWS(new PhTreeWS({
                        socket,
                        response: ({type, phTree, species}) => {
                            switch (type) {
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
                    viewTree({ id: t.id });
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
    <div className="size-screen flex flex-col-reverse sm:flex-row justify-between h-screen sm:justify-start overflow-hidden">
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
                        value={tree?.name}
                        onChange={e => {
                            if(tree) {
                                const { name, ...t } = tree;
                                setTree({
                                    name: e.target.value,
                                    ...t
                                })
                            }
                        }}
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
                    <div className="p-4 overflow-y-scroll">
                        {prop === TreeProp.TREE && tree && <TreeProps
                            tree={tree}
                            setTree={setTree}
                            treeSocket={phTreeWS}
                            tag={tag}
                            setTag={setTag}
                            getRootProps={getRootProps}
                            getInputProps={getInputProps}
                            isDragActive={isDragActive}
                        />}
                        {prop === TreeProp.NODE && tree && <NodeProps
                            tree={tree}
                            treeSocket={phTreeWS}
                            species={species}
                            setSpecies={setSpecies}
                            unit={unit}
                            setUnit={setUnit}
                            getRootProps={getRootProps}
                            getInputProps={getInputProps}
                            isDragActive={isDragActive}
                        />}
                    </div>
                </TreeProperties>
            </div>
        </main>
    </div>)
}