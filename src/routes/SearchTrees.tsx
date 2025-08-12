import { useEffect, useState } from "react";
import type { UserResponse, SearchProps, NotificationResponse, SearchResult } from "../types";
import { getMyTrees, searchTrees } from "../api/phTree";
import { useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/dashboard/Sidebar";
import { dashboardItems } from "../data/dashboardItems";
import { getMe, getUser, token } from "../api/user";
import { Header } from "../components/dashboard/Header";
import { getNotifications } from "../api/notification";
import { title } from "../data/classNames";
import { SearchHeader } from "../components/trees/SearchHeader";
import { TreeCard } from "../components/home/TreeCard";

interface SearchTreesProps extends SearchProps {
    myTrees?: boolean;
    owner?:boolean;
}

const omitUndefined = <T,>(obj: Record<string, T>): Record<string, T> => {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value !== undefined)
    );
};

export const SearchTrees = ({myTrees, owner, ...searchProps}: SearchTreesProps) => {
    const [trees, setTrees] = useState<SearchResult | undefined>(undefined);
    const [treeUsers, setTreeUsers] = useState<Map<string, string>>(new Map());
    const [expanded, setExpanded] = useState(false);
    const [user, setUser] = useState<UserResponse | undefined>(undefined);
    const [search, setSearch] = useState(searchProps.search ?? "");
    const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
    const [active, setActive] = useState(false);
    const [sProps, setSProps] = useState(searchProps);
    const location = useLocation().pathname;
    const history = useNavigate();
    const searchHref = (queries: SearchProps = {}) => `${location}?${Object.entries(omitUndefined(queries)).map(([k, v]) => `${k}=${v}`).join("&")}`;
    useEffect(() => {
        getMe({}).then(u => {
            setUser(u);
            getNotifications({}).then(n => setNotifications(n ?? []));
            token({ expiresIn: "7d" });
            document.title = myTrees ? (owner || owner === undefined) ? `Life Tree | ${u?.username}'s trees` : `Life Tree | ${u?.username}'s collabs` : "Life Tree | Search Trees";
        });
    }, []);
    useEffect(() => {
        const searchFunction = myTrees ? getMyTrees : searchTrees;
        searchFunction(omitUndefined({ owner, ...searchProps })).then(t => {
            setTrees(t);
            Promise.all(t?.trees.map(async (tree) => [tree.id, (await getUser({ id: tree.userId }))?.username ?? ""] as [string, string]) ?? []).then(tu => setTreeUsers(new Map(tu)));
        });
    }, [sProps]);

    const setSearchProps = (sp: SearchProps) => {
        setSProps(sp);
        history(searchHref(sp));
    };
    return (
        <>
            <div className="w-screen! flex flex-col-reverse sm:flex-row justify-between h-screen sm:justify-start overflow-hidden">
                {user && <Sidebar
                    expanded={expanded}
                    setExpanded={setExpanded}
                    items={dashboardItems}
                    currentPage={myTrees ? `/trees${owner ? "/me" : owner === false ? "/collabs" : ""}` : undefined}
                    user={user}
                />}
                <main className="flex flex-col w-full">
                    <Header
                        search={search}
                        setSearch={setSearch}
                        count={notifications.filter(({seen}) => !seen).length}
                        active={active}
                        setActive={setActive}
                    >
                        <h1 className={"block text-[2em]! font-bold " + title}>{myTrees ? `${user?.username}'s ${owner !== false ? "trees" : "collabs"}` : "Tree Search"}</h1>
                    </Header>
                    <SearchHeader
                        sProps={sProps}
                        setSearchProps={setSearchProps}
                        treesCount={trees?.count}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-3 p-10 gap-5">
                        {trees?.trees.map((tree, index) => <TreeCard
                            key={index}
                            tree={{
                                ...tree,
                                username: treeUsers.get(tree.id) ?? ""
                            }}
                            edit={myTrees}
                        />)}
                    </div>
                </main>
            </div>
        </>
    )
}