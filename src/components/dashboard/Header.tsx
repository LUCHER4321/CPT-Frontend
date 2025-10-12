import { useEffect, useState } from "react";
import { unborder } from "../../data/classNames";
import type { NotificationResponse, NotificationString } from "../../types";
import { notiToString } from "../../utils/notiToString";
import { Notifications } from "./Notifications";
import { SearchInput } from "./SearchInput";
import { seeNotification } from "../../api/notification";
import { Notification } from "./Notification";

interface HeaderProps {
    search?: string;
    setSearch?: (s: string) => void;
    notifications?: NotificationResponse[];
    setNotifications?: (n: NotificationResponse[]) => void;
    active?: boolean;
    setActive?: (b: boolean) => void;
    children?: any;
}

export const Header = ({
    search,
    setSearch,
    notifications,
    setNotifications,
    active,
    setActive,
    children
}: HeaderProps) => {
    const [notis, setNotis] = useState<Map<NotificationResponse, NotificationString>>(new Map());
    const now = new Date();
    useEffect(() => {
        Promise.all(notifications?.map(async (n) => [n, await notiToString(n)] as [NotificationResponse, NotificationString]) ?? []).then(ns => new Map(ns)).then(setNotis);
    }, [notifications]);
    return (
        <header className="p-6 flex flex-col sm:flex-row justify-between items-center w-full shadow-lg">
            {children}
            <div className="flex flex-row-reverse sm:flex-row justify-between w-full sm:w-auto pt-5 sm:pt-0 items-center">
                <a
                    href="https://discord.gg/s9cJJHcnA4"
                    target="_blank"
                    title="Join to our Discord"
                ><i className="fa-brands fa-discord text-black dark:text-white hover:text-2xl transition-all duration-300"/></a>
                <Notifications
                    className={"flex items-center p-0! sm:p-2! bg-black/0! relative mx-6 " + unborder}
                    count={notifications?.filter(({seen}) => !seen).length}
                    active={active}
                    setActive={async (a) => {
                        if(!a) {
                            const see = (n: NotificationResponse) : Promise<NotificationResponse> => n.seen ? new Promise(() => n) : seeNotification({ id: n.id }).then(() => ({ ...n, seen: true }));
                            Promise.all(notifications?.map(see) ?? []).then(setNotifications)
                        }
                        setActive?.(a);
                    }}
                >
                    <button className={"bg-black/0! fixed top-0 bottom-0 left-0 right-0 rounded-none! cursor-default! p-0! " + unborder} onClick={() => setActive?.(false)}/>
                    <table className="absolute top-full right-1/2 rounded z-10 max-h-96 overflow-y-auto shadow-lg">
                        <tr className="bg-white dark:bg-black">
                            <th colSpan={3} className="p-2 border-b rounded-t-full">Notifications</th>
                        </tr>
                        {[...notis.entries()].map(([notification, notiString], index) => <Notification
                            key={index}
                            notification={notification}
                            notiString={notiString}
                            now={now}
                        />)}
                        <tr className="bg-white dark:bg-black">
                            <th colSpan={3} className="p-2 rounded-b-full"> </th>
                        </tr>
                    </table>
                </Notifications>
                <SearchInput
                    search={search}
                    setSearch={setSearch}
                />
            </div>
        </header>
    )
};