import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import type { NotificationResponse, PhTreeResponse, UserResponse } from "../../types";
import { getTree, imageTree, viewTree } from "../../api/phTree";
import { getMe, getUser, userSearch } from "../../api/user";
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
import { Species } from "chrono-phylo-tree";
import { speciesImage, treeSpecies } from "../../api/species";
import { useDropzone } from "react-dropzone";
import { CollabProps } from "../../components/dashboard/trees/CollabProps";
import { TreeCanvas } from "../../components/dashboard/trees/TreeCanvas";
import { SpNode } from "../../components/dashboard/trees/Node";

export const TreeEditor = () => {
    const [expanded, setExpanded] = useState(false);
    const [tree, setTree] = useState<PhTreeResponse | undefined>(undefined);
    const [species, setSpecies] = useState<Species | undefined>(undefined);
    const [commonAncestors, setCommonAncestors] = useState<Species[] | undefined>(undefined);
    const [unit, setUnit] = useState(TimeUnit.Y);
    const [user, setUser] = useState<UserResponse | undefined>(undefined);
    const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
    const [search, setSearch] = useState("");
    const [collabSearch, setCollabSearch] = useState<UserResponse[] | undefined>(undefined);
    const [active, setActive] = useState(false);
    const [_, setNotificationWS] = useState<NotificationWS | undefined>(undefined);
    const [phTreeWS, setPhTreeWS] = useState<PhTreeWS | undefined>(undefined);
    const [chronoScale, setChronoScale] = useState(true);
    const [prop, setProp] = useState(TreeProp.TREE);
    const [tag, setTag] = useState("");
    const [collab, setCollab] = useState("");
    const [currentCollab, setCurrentCollab] = useState<UserResponse[] | undefined>(undefined);
    const ref = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const baseZoom = 0.9;
    const [zoom, setZoom] = useState(baseZoom);
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
                                    const deleted = commonAncestors?.flatMap(c => c.allDescendants(false)).find(s => s.id === species.id);
                                    if(!deleted?.ancestor) setCommonAncestors(commonAncestors?.filter(c => c.id !== deleted?.id));
                                    else deleted.unlinkAncestor();
                                    break;
                                case TreeChange.TREE:
                                    if(!phTree || !tree) return;
                                    const { createdAt, updatedAt, likes, comments, views } = tree;
                                    setTree({
                                        ...phTree,
                                        createdAt,
                                        updatedAt,
                                        likes,
                                        comments,
                                        views
                                    });
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
                    Promise.all(t.collaborators?.map(c => getUser({ id: c })) ?? []).then(cl => cl.filter(c => c !== undefined)).then(setCurrentCollab);
                    treeSpecies({ treeId: t.id }).then(sl => sl?.map(s => Species.fromJSON(s)) ?? []).then(setCommonAncestors);
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
        const handleResize = () => {
            if (ref.current) {
                const { width, height } = ref.current.getBoundingClientRect();
                setDimensions({ width, height });
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize, false);
    }, []);

    useEffect(() => {
        document.title = `Life Tree | Edit "${tree?.name}"`
    }, [tree]);

    const human = Species.fromJSON({
        id: "0",
        name: "Humano",
        apparition: 0,
        duration: 1,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7XK_e3HG0jhOticytH1Dn3tzBEZyRyWc5Mg&s"
    });
    const eloi = human.addDescendant({
        id: "1",
        name: "Eloi",
        afterApparition: 1,
        duration: 1,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpWm67FEX1fc7lCDwWzwOWRSytyDShuLxvIg&s"
    })

    return (
    <div className="w-screen! flex flex-col-reverse sm:flex-row justify-between h-screen sm:justify-start overflow-hidden">
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
            <div className="flex flex-row h-full! w-full! overflow-hidden">
                <TreeVisualization
                    chronoScale={chronoScale}
                    setChronoScale={setChronoScale}
                    zoom={zoom}
                    setZoom={setZoom}
                    baseZoom={baseZoom}
                    minZoom={0.1}
                    maxZoom={10}
                    deltaZoom={0.1}
                >
                    <TreeCanvas
                        className={`bg-green-700 absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center ${zoom > 1 ? "overflow-scroll" : ""}`}
                        ref={ref}
                        zoom={zoom}
                        width={dimensions.width}
                        height={dimensions.height}
                    >
                        {SpNode({ species: human, diameter: dimensions.height * zoom / 2 })}
                        {SpNode({ species: eloi, diameter: dimensions.height * zoom / 2 })}
                    </TreeCanvas>
                </TreeVisualization>
                <TreeProperties
                    prop={prop}
                    setProp={setProp}
                >
                    <div className="p-4 overflow-y-auto h-full">
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
                        {prop === TreeProp.NODE && tree && (species ? <NodeProps
                            tree={tree}
                            treeSocket={phTreeWS}
                            species={species}
                            setSpecies={setSpecies}
                            unit={unit}
                            setUnit={setUnit}
                            getRootProps={getRootProps}
                            getInputProps={getInputProps}
                            isDragActive={isDragActive}
                        /> : <h1 className={"text-center h-full flex items-center " + title}>SELECT A SPECIES TO EDIT IT</h1>)}
                        {prop === TreeProp.COLLABORATORS && tree && <CollabProps
                            tree={tree}
                            collab={collab}
                            setCollab={c => {
                                setCollab(c);
                                userSearch({ search: c, limit: 6 + (tree.collaborators?.length ?? 0) }).then(c => c?.slice(0, 5)).then(setCollabSearch)
                            }}
                            search={collabSearch}
                            currentCollab={currentCollab}
                            user={user}
                        />}
                    </div>
                </TreeProperties>
            </div>
        </main>
    </div>)
}