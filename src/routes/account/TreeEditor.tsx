import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { useNavigate, useParams } from "react-router-dom"
import type { NotificationResponse, PhTreeResponse, StrictSpecies, UserResponse } from "../../types";
import { getTree, imageTree, viewTree } from "../../api/phTree";
import { getMe, getUser, token, userSearch } from "../../api/user";
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
import { createSpecies, speciesImage, treeSpecies } from "../../api/species";
import { useDropzone } from "react-dropzone";
import { CollabProps } from "../../components/dashboard/trees/CollabProps";
import { TreeCanvas } from "../../components/dashboard/trees/TreeCanvas";
import { SpNode } from "../../components/dashboard/trees/Node";
import { readFileAsJson } from "../../utils/readFileAsJson";
import { nullableInput } from "../../utils/nullableInput";
import { plans } from "../../data/prices";

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
    const [json, setJSON] = useState<StrictSpecies | StrictSpecies[] | undefined>(undefined);
    const [name, setName] = useState("");
    const [apparition, setApparition] = useState(0);
    const [duration, setDuration] = useState(0);
    const [description, setDescription] = useState("");
    const ref = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [startScroll, setStartScroll] = useState({ left: 0, top: 0 });
    const [present, setPresent] = useState(false);
    const [presentTime, setPresentTime] = useState<number | undefined>(undefined);
    const [showNames, setShowNames] = useState(true);
    const [selection, setSelection] = useState(true);
    const [grids, setGrids] = useState(true);
    const [maxSpecies, setMaxSpecies] = useState<number | undefined>(undefined);
    const baseZoom = 0.9;
    const deltaZoom = 0.1;
    const maxZoom = 10;
    const minZoom = 0.1;
    const minHeight = 100;
    const minWidth = 175;
    const [zoom, setZoom] = useState(baseZoom);
    const { id } = useParams();
    const history = useNavigate();

    const handleMouseMove = ({clientX, clientY}: MouseEvent) => {
        if (isDragging && ref.current && !selection) {
            const dx = startPos.x - clientX;
            const dy = startPos.y - clientY;
            ref.current.scrollLeft = startScroll.left + dx;
            ref.current.scrollTop = startScroll.top + dy;
        }
    };

    const handleMouseDown = ({ clientX, clientY }: MouseEvent) => {
        setIsDragging(true);
        setStartPos({ x: clientX, y: clientY });
        if(ref.current) {
            const { scrollLeft, scrollTop } = ref.current;
            setStartScroll({ left: scrollLeft, top: scrollTop })
        }
    }

    const handleMouseUp = () => setIsDragging(false);

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

    const onDropJSON = useCallback((files?: File[]) => {
        const [file] = files ?? [undefined];
        if(file && tree) readFileAsJson({
            file,
            setJSON
        });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    const { getRootProps: grp, getInputProps: gip, isDragActive: ida } = useDropzone({ onDrop: onDropJSON });

    useEffect(() => {
        if(id) getMe({}).then(u => {
            setUser(u);
            setMaxSpecies(nullableInput(u?.plan, p => plans.get(p)?.constraints.maxSpecies));
            getTree({ id }).then(t => {
                if(t) {
                    setTree(t);
                    setPhTreeWS(new PhTreeWS({
                        socket,
                        response: ({type, phTree, species}) => {
                            switch (type) {
                                case TreeChange.NEW:
                                    if(!species) return;
                                    const newSpecies = Species.fromJSON(species);
                                    if(species.ancestorId) {
                                        const ancestor = commonAncestors?.flatMap(ca => ca.allDescendants(false)).find(sp => sp.id === species.ancestorId);
                                        if(ancestor) newSpecies.linkAncestor(ancestor);
                                    } else {
                                        setCommonAncestors([...commonAncestors ?? [], newSpecies]);
                                    }
                                    break;
                                case TreeChange.EDIT:
                                    if(!species) return;
                                    const find = commonAncestors?.flatMap(ca => ca.allDescendants(false)).find;
                                    if(!find) return;
                                    const oldSpecies = find(sp => sp.id === species.id);
                                    if(!oldSpecies) return;
                                    oldSpecies.name = species.name;
                                    oldSpecies.apparition = species.apparition ?? ((oldSpecies.ancestor?.apparition ?? 0) + (species.afterApparition ?? 0));
                                    oldSpecies.duration = species.duration;
                                    oldSpecies.ancestor = find(sp => sp.id === species.ancestorId);
                                    oldSpecies.description = species.description;
                                    oldSpecies.image = species.image;
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
            token({ expiresIn: "7d" });
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

    useEffect(() => {
        const array = nullableInput(json, j => Array.isArray(j) ? j : [j]);
        if(tree && array) Promise.all(array.map(j => createSpecies({ treeId: tree.id, ...j }))).then(sp => {
            const filterSP = sp.filter(s => s !== undefined);
            if(filterSP.length) {
                setCommonAncestors([...commonAncestors ?? [], ...filterSP.map(s => Species.fromJSON(s))]);
                setJSON(undefined);
            }
        });
    }, [json]);

    useEffect(() => {
        setPresentTime(present ? Math.max(...commonAncestors?.map(ca => ca.absoluteExtinction()) ?? []) : undefined);
    }, [present]);

    useEffect(() => {
        if(species){
            setName(species.name);
            setApparition(species.apparition);
            setDuration(species.duration);
            setDescription(species.description ?? "");
            setProp(TreeProp.NODE);
        }
        if(ref.current && commonAncestors) {
            if(species){
                const ad = commonAncestors.flatMap(ca => ca.allDescendants());
                const d = chronoScale ? Math.max(...commonAncestors.map(ca => ca.absoluteExtinction())) - Math.min(...commonAncestors.map(ca => ca.apparition)) : Math.max(...ad.map(sp => sp.firstAncestor().stepsUntil(sp) ?? 0));
                const i = Math.min(...ad.map((s, index) => s.id === species.id ? index : Number.MAX_SAFE_INTEGER));
                const { scrollHeight, scrollWidth } = ref.current;
                const { width, height } = dimensions;
                const st = (x = 0, s = 1) => scrollHeight * (x + s) / ad.length;
                ref.current.scrollTop = st(i, 1 / 2) - height / 2;
                ref.current.scrollLeft = scrollWidth * (chronoScale ? species.extinction() : species.firstAncestor().stepsUntil(species) ?? 0) / d - width / 2 - st();
            }
            else {
                const fa = Math.min(...commonAncestors.map(ca => ca.apparition) ?? []);
                const ad = commonAncestors.flatMap(ca => ca.allDescendants());
                const i = Math.min(...ad.map((s, index) => s.apparition === fa ? index : Number.MAX_SAFE_INTEGER));
                const { scrollHeight } = ref.current;
                ref.current.scrollTop = scrollHeight * (i - 1) / ad.length;
            }
        }
    }, [species, commonAncestors, ref.current, chronoScale])
    
    const total = commonAncestors?.flatMap(ca => ca.allDescendants(false)).filter(s => (present && presentTime !== undefined && chronoScale) ? s.extinction() <= presentTime : true).length ?? 1;

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
                    {tree && <input
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
                    />}
                </div>
            </Header>
            <div className="flex flex-row h-full! w-full! overflow-hidden">
                <TreeVisualization
                    tree={tree}
                    treeSocket={phTreeWS}
                    selected={species}
                    setSelected={setSpecies}
                    selection={selection}
                    setSelection={setSelection}
                    commonAncerstors={commonAncestors}
                    setCommonAncerstors={setCommonAncestors}
                    chronoScale={chronoScale}
                    setChronoScale={setChronoScale}
                    showName={showNames}
                    setShowName={setShowNames}
                    grids={grids}
                    setGrids={setGrids}
                    zoom={zoom}
                    setZoom={setZoom}
                    baseZoom={baseZoom}
                    minZoom={minZoom}
                    maxZoom={maxZoom}
                    deltaZoom={deltaZoom}
                    svgId="tree-canvas"
                    maxSpecies={maxSpecies}
                >
                    <TreeCanvas
                        className={`absolute top-0 bottom-0 right-0 left-0 ${selection ? "" : isDragging ? "cursor-grabbing" : "cursor-grab"}`}
                        ref={ref}
                        zoom={zoom}
                        width={dimensions.width}
                        height={dimensions.height}
                        unit={unit}
                        chronoScale={chronoScale}
                        minHeight={minHeight}
                        minWidth={minWidth}
                        grids={grids}
                        svgId="tree-canvas"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                    >
                        {commonAncestors?.flatMap(ca => ca.allDescendants()).filter(s => (present && presentTime !== undefined && chronoScale) ? s.extinction() <= presentTime : true).map(s => SpNode({ species: s, diameter: Math.max(dimensions.height / total, minHeight ?? 0) * zoom, setSpecies, showNames, selection }))}
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
                            unit={unit}
                            setUnit={setUnit}
                            chronoScale={chronoScale}
                            present={present}
                            setPresent={setPresent}
                            presentTime={presentTime}
                            setPresentTime={setPresentTime}
                            commonAncestors={commonAncestors}
                            getRootProps={getRootProps}
                            getInputProps={getInputProps}
                            isDragActive={isDragActive}
                            getRootPropsJSON={grp}
                            getInputPropsJSON={gip}
                            isDragActiveJSON={ida}
                        />}
                        {prop === TreeProp.NODE && tree && <NodeProps
                            tree={tree}
                            treeSocket={phTreeWS}
                            species={species}
                            setSpecies={setSpecies}
                            commonAncestors={commonAncestors}
                            setCommonAncestors={setCommonAncestors}
                            unit={unit}
                            setUnit={setUnit}
                            name={name}
                            setName={setName}
                            apparition={apparition}
                            setApparition={setApparition}
                            duration={duration}
                            setDuration={setDuration}
                            description={description}
                            setDescription={setDescription}
                            getRootProps={getRootProps}
                            getInputProps={getInputProps}
                            isDragActive={isDragActive}
                        />}
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