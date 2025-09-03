import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Sidebar } from "../../components/dashboard/Sidebar";
import { dashboardItems } from "../../data/dashboardItems";
import type { CommentResponse, NotificationResponse, PhTreeResponse, UserResponse } from "../../types";
import { useParams } from "react-router-dom";
import { getMe, getUser, token } from "../../api/user";
import { getTree } from "../../api/phTree";
import { getNotifications } from "../../api/notification";
import { Header } from "../../components/dashboard/Header";
import { accountContainer, aText, borderButton, filledButton, title, unborder } from "../../data/classNames";
import { TreeVisualization } from "../../components/dashboard/trees/TreeVisualization";
import { TreeCanvas } from "../../components/dashboard/trees/TreeCanvas";
import { Liked, NotiFunc, TimeUnit, TreeProp } from "../../enums";
import { Species } from "chrono-phylo-tree";
import { treeSpecies } from "../../api/species";
import { SpNode } from "../../components/dashboard/trees/Node";
import { TreeProperties } from "../../components/dashboard/trees/TreeProperties";
import { TreeViewProps } from "../../components/trees/TreeViewProps";
import { getLikes, like, unlike } from "../../api/like";
import { NodeViewProps } from "../../components/trees/NodeViewProps";
import { CommentViewProps } from "../../components/trees/CommentViewProps";
import { treeComments } from "../../api/comment";
import { notificationService } from "../../classes/NotificationService";

export const TreeViewer = () => {
    const [expanded, setExpanded] = useState(false);
    const [tree, setTree] = useState<PhTreeResponse | undefined>(undefined);
    const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
    const [search, setSearch] = useState("");
    const [active, setActive] = useState(false);
    const [user, setUser] = useState<UserResponse | undefined>(undefined);
    const [showNames, setShowNames] = useState(true);
    const [selection, setSelection] = useState(true);
    const [grids, setGrids] = useState(true);
    const [chronoScale, setChronoScale] = useState(true);
    const ref = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [startScroll, setStartScroll] = useState({ left: 0, top: 0 });
    const [unit, setUnit] = useState(TimeUnit.Y);
    const [species, setSpecies] = useState<Species | undefined>(undefined);
    const [commonAncestors, setCommonAncestors] = useState<Species[] | undefined>(undefined);
    const [present, setPresent] = useState(false);
    const [presentTime, setPresentTime] = useState<number | undefined>(undefined);
    const [prop, setProp] = useState(TreeProp.TREE);
    const [creator, setCreator] = useState<UserResponse | undefined>(undefined);
    const [liked, setLiked] = useState(false);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState<CommentResponse[] | undefined>([]);
    const [open, setOpen] = useState(false);
    const baseZoom = 0.9;
    const [zoom, setZoom] = useState(baseZoom);
    const deltaZoom = 0.1;
    const maxZoom = 10;
    const minZoom = 0.1;
    const minHeight = 100;
    const minWidth = 175;
    const { id } = useParams();
    
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
    };
    
    const handleMouseUp = () => setIsDragging(false);

    useEffect(() => {
        if(id) getMe({}).then(u => {
            setUser(u);
            getTree({ id }).then(t => {
                setTree(t);
                treeSpecies({ treeId: id }).then(sl => sl?.map(s => Species.fromJSON(s)) ?? []).then(setCommonAncestors);
                getUser({ id: t?.userId ?? "" }).then(setCreator);
                getLikes({ liked: Liked.TREE, id }).then(t => setLiked(t?.myLike ?? false));
                treeComments({ treeId: id }).then(setComments)
            });
            getNotifications({}).then(n => {
                setNotifications(n ?? []);
            });
            notificationService.initialize({
                response: nr => setNotifications([nr, ...notifications]),
                userId: u?.id ?? ""
            });
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
        document.title = `Life Tree | View "${tree?.name}"`
    }, [tree]);

    useEffect(() => {
        setPresentTime(present ? Math.max(...commonAncestors?.map(ca => ca.absoluteExtinction()) ?? []) : undefined);
    }, [present]);

    useEffect(() => {
        if(species) setProp(TreeProp.NODE);
    }, [species]);
    
    useEffect(() => {
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
    }, [species, commonAncestors, ref.current, chronoScale]);

    const total = commonAncestors?.flatMap(ca => ca.allDescendants(false)).filter(s => (present && presentTime !== undefined && chronoScale) ? s.extinction() <= presentTime : true).length ?? 1;
    return(
        <div className={accountContainer}>
            {user && <Sidebar
                expanded={expanded}
                setExpanded={setExpanded}
                items={dashboardItems}
                currentPage={user?.id === tree?.userId ? "/trees/me" : user?.id && tree?.collaborators?.includes(user.id) ? "/trees/collabs" : ""}
                user={user}
            />}
            <main className="flex flex-col w-full h-full">
                <Header
                    search={search}
                    setSearch={setSearch}
                    count={notifications.filter(({seen}) => !seen).length}
                    active={active}
                    setActive={setActive}
                >
                    <div className="flex flex-row space-x-7 items-center">
                        <div className="flex flex-col">
                            <h2 className={"text-2xl " + title}>{tree?.name}</h2>
                            <p>By: <a href={`/profiles/${creator?.id}`} className={aText}>@{creator?.username}</a></p>
                        </div>
                        {(user?.id === tree?.userId || (user?.id && tree?.collaborators?.includes(user.id))) && <a
                            href={`/account/trees/${id}`}
                            className="size-9 rounded p-0! flex items-center justify-center text-[calc(40px/3)]! bg-[#D8EDD9]! dark:bg-[#1B5E20]! text-[#1B5E20]! dark:text-[#D8EDD9]! hover:bg-[#1B5E20]! hover:text-[#D8EDD9]! hover:dark:bg-[#D8EDD9]! hover:dark:text-[#1B5E20]!"
                            title={`Edit "${tree?.name}"`}
                        >
                            <i className="fas fa-edit"/>
                        </a>}
                        <button
                            className={"flex flex-row items-center space-x-1 py-2! px-4! " + (liked ? filledButton : borderButton)}
                            onClick={() => {
                                if(user && id) {
                                    const likeFun = liked ? unlike : like;
                                    likeFun({ liked: Liked.TREE, id }).then(() => {
                                        if(tree){
                                            const { likes = 0, ...t } = tree;
                                            setTree({
                                                likes: likes + (liked ? -1 : 1),
                                                ...t
                                            });
                                            if(!liked) notificationService.emit({
                                                fun: NotiFunc.LIKE,
                                                treeId: tree.id
                                            });
                                            setLiked(!liked);
                                        }
                                    });
                                }
                            }}
                        >
                            <i className="fas fa-heart"/>
                            <p>{tree?.likes}</p>
                        </button>
                        <button
                            className={"none flex sm:hidden h-full items-center bg-black/0! p-0! " + unborder}
                            onClick={() => setOpen(!open)}
                        >
                            <i className={`fas ${open ? "fa-times" : "fa-bars"}`}/>
                        </button>
                    </div>
                </Header>
                <div className="flex sm:flex-row flex-col h-full! w-full! sm:overflow-hidden relative">
                    <TreeVisualization
                        tree={tree}
                        selection={selection}
                        setSelection={setSelection}
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
                        open={open}
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
                        view
                        open={open}
                        setOpen={setOpen}
                    >
                        <div className="p-4 overflow-y-auto h-full">
                            {prop === TreeProp.TREE && <TreeViewProps
                                tree={tree}
                                unit={unit}
                                setUnit={setUnit}
                                chronoScale={chronoScale}
                                present={present}
                                setPresent={setPresent}
                                presentTime={presentTime}
                                setPresentTime={setPresentTime}
                                commonAncestors={commonAncestors}
                                user={creator}
                            />}
                            {prop === TreeProp.NODE && <NodeViewProps
                                species={species}
                                setSpecies={setSpecies}
                                commonAncestors={commonAncestors}
                            />}
                            {prop === TreeProp.COMMENTS && <CommentViewProps
                                tree={tree}
                                setTree={setTree}
                                user={user}
                                comment={comment}
                                setComment={setComment}
                                comments={comments}
                                setComments={setComments}
                            />}
                        </div>
                    </TreeProperties>
                </div>
            </main>
        </div>
    )
};