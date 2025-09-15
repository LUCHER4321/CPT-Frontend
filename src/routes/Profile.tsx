import { useEffect, useState } from "react"
import { Sidebar } from "../components/dashboard/Sidebar"
import { accountContainer, photoClass, title, unborder } from "../data/classNames"
import { dashboardItems } from "../data/dashboardItems"
import type { PhTreeResponse, NotificationResponse, UserResponse } from "../types"
import { Header } from "../components/dashboard/Header"
import { useParams } from "react-router-dom"
import { admin, getMe, getUser, token, updateMe } from "../api/user"
import { plans } from "../data/prices"
import { NotiFunc, Plan, Role } from "../enums"
import { nullableInput } from "../utils/nullableInput"
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter"
import { dateToString } from "../utils/dateToString"
import { getNotifications } from "../api/notification"
import { searchTrees, treesCount } from "../api/phTree"
import { follow, getFollowersCount, getFollowing, unfollow } from "../api/follow"
import { DataDisplay } from "../components/profile/DataDisplay"
import { AuthField } from "../components/auth/AuthField"
import { TreeCard } from "../components/home/TreeCard"
import { notificationService } from "../classes/NotificationService"

interface ProfileProps {
    myProfile?: boolean
}

export const Profile = ({
    myProfile
}: ProfileProps) => {
    const [editing, setEditing] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [description, setDescription] = useState("");
    const [user, setUser] = useState<UserResponse | undefined>(undefined);
    const [currentUser, setCurrentUser] = useState<UserResponse | undefined>(undefined);
    const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
    const [active, setActive] = useState(false);
    const [search, setSearch] = useState("");
    const [following, setFollowing] = useState(false);
    const [trees, setTrees] = useState<PhTreeResponse[]>([]);
    const [treeUsers, setTreeUsers] = useState<Map<string, string>>(new Map());
    const [data, setData] = useState<{
        trees?: number;
        following?: number;
        followers?: number;
    }>({});
    const { id } = useParams();

    useEffect(() => {
        getMe({}).then(u => {
            setUser(u);
            if(myProfile) setCurrentUser(u);
            else if(id) getUser({ id }).then(setCurrentUser);
            getNotifications({}).then(n => {
                setNotifications(n ?? []);
            });
            notificationService.initialize({
                response: nr => setNotifications([nr, ...notifications]),
                userId: u?.id ?? ""
            });
            token({ expiresIn: "7d" });
        });
    }, []);

    useEffect(() => {
        document.title = `Life Tree | ${currentUser?.username}'s profile`;
        if(currentUser) {
            treesCount({ userId: currentUser.id }).then(
                tc => getFollowing({ userId: currentUser.id }).then(
                    f0 => getFollowersCount({ userId: currentUser.id }).then(
                        f1 => {
                            setData({
                                trees: tc?.total,
                                followers: f1?.count,
                                following: f0?.length
                            });
                            searchTrees({ userId: currentUser.id, limit: tc?.total }).then(t => {
                                Promise.all(t?.trees.map(async (tree) => [tree.id, (await getUser({ id: tree.userId }))?.username ?? ""] as [string, string]) ?? []).then(tu => setTreeUsers(new Map(tu)));
                                setTrees(t?.trees ?? []);
                            });
                            nullableInput(user?.id, userId => getFollowing({ userId }))?.then(f => setFollowing(f?.map(({ id }) => id).includes(currentUser.id) ?? false));
                        }
                    )
                )
            );
            setDescription(currentUser.description ?? "");
        }
    }, [currentUser]);

    return (
        <>
            <div className={accountContainer}>
                {user && <Sidebar
                    expanded={expanded}
                    setExpanded={setExpanded}
                    items={dashboardItems}
                    user={user}
                />}
                <main className="flex flex-col w-full h-full top-0 absolute sm:relative">
                    <Header
                        search={search}
                        setSearch={setSearch}
                        notifications={notifications}
                        setNotifications={setNotifications}
                        active={active}
                        setActive={setActive}
                    >
                        <h2 className={"text-2xl " + title}>{currentUser?.username}'s Profile</h2>
                    </Header>
                    <div className="w-full px-6 pt-16 pb-6 overflow-y-scroll">
                        <div className="flex flex-row space-x-3 items-center mb-2">
                            {currentUser?.photo ? <img className={photoClass} src={currentUser?.photo}/> : <i className={photoClass + " fas fa-user dark:text-[#D8EDD9] text-[#1B5E20] text-center text-4xl"}/>}
                            <h2 className={"text-2xl " + title}>{currentUser?.username}</h2>
                            {currentUser?.plan !== Plan.FREE && <span className={"px-3 py-1 rounded-full " + plans.get(currentUser?.plan ?? Plan.FREE)?.button?.light + " " + plans.get(currentUser?.plan ?? Plan.FREE)?.button?.dark}>{nullableInput(currentUser?.plan, capitalizeFirstLetter)}</span>}
                            {user?.id !== currentUser?.id && <button
                                className={`${following ? "bg-red-300! dark:bg-red-700! hover:bg-red-400! dark:hover:bg-red-800!": "bg-green-300! dark:bg-green-700! hover:bg-green-400! dark:hover:bg-green-800!"} rounded-full ${unborder}`}
                                onClick={() => {
                                    const followFunction = following ? unfollow : follow;
                                    followFunction({ id: currentUser?.id ?? "" }).then(() => {
                                        setData(prev => ({
                                            ...prev,
                                            followers: (prev.followers ?? 0) + (following ? -1 : 1)
                                        }));
                                        if(!following) notificationService.emit({
                                            fun: NotiFunc.FOLLOW,
                                            userId: currentUser?.id
                                        })
                                        setFollowing(!following);
                                    });
                                }}
                            >
                                <i className={`fas ${following ? "fa-user-minus" : "fa-user-plus"}`}/>
                            </button>}
                            {(user?.role === Role.BOSS && user.id !== currentUser?.id) && <button
                                className={`${currentUser?.role !== Role.USER ? "bg-red-300! dark:bg-red-700! hover:bg-red-400! dark:hover:bg-red-800!": "bg-green-300! dark:bg-green-700! hover:bg-green-400! dark:hover:bg-green-800!"} rounded-full ${unborder}`}
                                onClick={() => admin({ adminId: currentUser?.id ?? "", removeAdmin: currentUser?.role !== Role.USER}).then(setCurrentUser)}
                            >
                                <i className={`fas ${currentUser?.role !== Role.USER ? "fa-user-shield" : "fa-user-tag"}`}/>
                            </button>}
                        </div>
                        <div className="flex flex-row space-x-2 items-center mb-2">
                            {user?.id === currentUser?.id && <i className="fas fa-edit cursor-pointer" onClick={() => {
                                if(editing) updateMe({ description }).then(u => {
                                    setCurrentUser(u);
                                    setUser(u);
                                });
                                setEditing(!editing);
                            }}/>}
                            {editing ? <AuthField
                                textArea
                                className="w-full mb-0!"
                                type="text"
                                value={description}
                                setValue={setDescription}
                            /> : <p className="w-full">{currentUser?.description}</p>}
                        </div>
                        <div className="flex flex-row space-x-2 items-center mb-2">
                            <i className="fas fa-envelope"/>
                            <p>{currentUser?.email}</p>
                        </div>
                        <div className="flex flex-row space-x-2 items-center mb-2">
                            <i className="fas fa-calendar-alt"/>
                            <p>Member since: {dateToString("MMn YYYY", currentUser?.createdAt)}</p>
                        </div>
                        <div className="flex flex-row space-x-6 my-6 py-4 border-y">
                            <DataDisplay
                                data={data.trees}
                                title="Trees"
                            />
                            <DataDisplay
                                data={data.followers}
                                title="Followers"
                            />
                            <DataDisplay
                                data={data.following}
                                title="Following"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 p-10 gap-5">
                            <h2 className={"col-span-full text-3xl " + title}>{currentUser?.username}'s trees</h2>
                            {trees.map((t, index) => <TreeCard
                                key={index}
                                tree={{
                                    ...t,
                                    username: treeUsers.get(t.id) ?? ""
                                }}
                            />)}
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}