import { useEffect, useState } from "react";
import type { UserResponse, SearchProps, NotificationResponse, SearchResult } from "../../types";
import { getMyTrees, searchTrees } from "../../api/phTree";
import { useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "../../components/dashboard/Sidebar";
import { dashboardItems } from "../../data/dashboardItems";
import { getMe, getUser, token } from "../../api/user";
import { Header } from "../../components/dashboard/Header";
import { getNotifications } from "../../api/notification";
import { accountContainer, title } from "../../data/classNames";
import { SearchHeader } from "../../components/trees/SearchHeader";
import { TreeCard } from "../../components/home/TreeCard";
import { likedTrees } from "../../api/like";
import { Card } from "../../components/home/Card";
import { newPhTree } from "../../utils/newPhTree";
import { notificationService } from "../../classes/NotificationService";
import { Footer } from "../../components/Footer";

interface SearchTreesProps extends SearchProps {
    myTrees?: boolean;
    owner?:boolean;
    liked?: boolean;
}

const omitUndefined = <T,>(obj: Record<string, T>): Record<string, T> => {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value !== undefined)
    );
};

export const SearchTrees = ({myTrees, owner, liked, ...searchProps}: SearchTreesProps) => {
    const [trees, setTrees] = useState<SearchResult | undefined>(undefined);
    const [treeUsers, setTreeUsers] = useState<Map<string, string>>(new Map());
    const [expanded, setExpanded] = useState(false);
    const [user, setUser] = useState<UserResponse | undefined>(undefined);
    const [search, setSearch] = useState(searchProps.search ?? "");
    const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
    const [active, setActive] = useState(false);
    const [sProps, setSProps] = useState(searchProps);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const location = useLocation().pathname;
    const history = useNavigate();
    const searchFunction = myTrees ? getMyTrees : searchTrees;
    const searchHref = (queries: SearchProps = {}) => `${location}?${Object.entries(omitUndefined(queries)).map(([k, v]) => `${k}=${v}`).join("&")}`;
    useEffect(() => {
        getMe({}).then(u => {
            setUser(u);
            getNotifications({}).then(n => setNotifications(n ?? []));
            notificationService.initialize({
                response: nr => setNotifications([nr, ...notifications]),
                userId: u?.id ?? ""
            });
            token({ expiresIn: "7d" });
            document.title = `Life Tree | ${liked ? "Liked Trees" : myTrees ? (owner || owner === undefined) ? `${u?.username}'s Trees` : `${u?.username}'s Collabs` : "Search Trees"}`;
        });
    }, []);
    useEffect(() => {
        if(!liked) searchFunction(omitUndefined({ owner, ...searchProps })).then(t => {
            setTrees(t);
            Promise.all(t?.trees.map(async (tree) => [tree.id, (await getUser({ id: tree.userId }))?.username ?? ""] as [string, string]) ?? []).then(tu => setTreeUsers(new Map(tu)));
        });
        else likedTrees({}).then(trees => {
            if(trees) {
                setTrees({
                    trees,
                    count: trees.length
                });
                Promise.all(trees.map(async (tree) => [tree.id, (await getUser({ id: tree.userId }))?.username ?? ""] as [string, string]) ?? []).then(tu => setTreeUsers(new Map(tu)));
            }
        })
    }, [sProps]);

    const setSearchProps = (sp: SearchProps) => {
        setSProps(sp);
        history(searchHref(sp));
    };
    return (
        <>
            <div className={accountContainer}>
                {user && <Sidebar
                    expanded={expanded}
                    setExpanded={setExpanded}
                    items={dashboardItems}
                    currentPage={liked ? "/liked" : myTrees ? `/trees${owner ? "/me" : owner === false ? "/collabs" : ""}` : undefined}
                    user={user}
                />}
                <main className="flex flex-col w-full">
                    <Header
                        search={search}
                        setSearch={setSearch}
                        notifications={notifications}
                        setNotifications={setNotifications}
                        active={active}
                        setActive={setActive}
                    >
                        <h1 className={"block text-[1.5em]! sm:text-[2em]! font-bold " + title}>{liked ? "Liked Trees" : myTrees ? `${user?.username}'s ${owner !== false ? "Trees" : "Collabs"}` : "Tree Search"}</h1>
                    </Header>
                    {!liked && <SearchHeader
                        sProps={sProps}
                        setSearchProps={setSearchProps}
                        treesCount={trees?.count}
                    />}
                    <div className="overflow-y-scroll">
                        <div className="grid grid-cols-1 sm:grid-cols-3 p-10 gap-5 min-h-full">
                            {myTrees && <Card
                                fa="fa-plus"
                                description="New Tree"
                                onClick={newPhTree(history)}
                            />}
                            {trees?.trees.map((tree, index) => <TreeCard
                                key={index}
                                tree={{
                                    ...tree,
                                    username: treeUsers.get(tree.id) ?? ""
                                }}
                                edit={myTrees}
                            />)}
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
    )
}