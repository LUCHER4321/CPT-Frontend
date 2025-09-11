import { useEffect, useState } from "react";
import { unborder } from "../../data/classNames";
import type { NotificationResponse, NotificationString } from "../../types";
import { notiToString } from "../../utils/notiToString";
import { Notifications } from "./Notifications";
import { SearchInput } from "./SearchInput";
import { dateToString } from "../../utils/dateToString";
import { seeNotification } from "../../api/notification";

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
    const day = 24 * 3600000;
    const year = 365.25 * day;
    useEffect(() => {
        Promise.all(notifications?.map(async (n) => [n, await notiToString(n)] as [NotificationResponse, NotificationString]) ?? []).then(ns => new Map(ns)).then(setNotis);
    }, [notifications]);
    return (
        <header className="p-6 flex flex-col sm:flex-row justify-between items-center w-full shadow-lg">
            {children}
            <div className="flex flex-row-reverse sm:flex-row justify-between w-full sm:w-auto pt-5 sm:pt-0">
                <Notifications
                    className={"flex items-center p-0! sm:p-2! bg-black/0! relative mr-6 " + unborder}
                    count={notifications?.filter(({seen}) => !seen).length}
                    active={active}
                    setActive={a => {
                        if(active) Promise.all(notifications?.filter(({seen}) => !seen).map(({ id }) => seeNotification({ id })) ?? []).then(() => setNotifications?.(notifications?.map(n => ({ ...n, seen: true })) ?? []));
                        setActive?.(a);
                    }}
                >
                    <button className={"bg-black/0! fixed top-0 bottom-0 left-0 right-0 rounded-none! " + unborder} onClick={() => setActive?.(false)}/>
                    <table className="absolute top-full right-1/2 rounded z-10 max-h-96 overflow-y-auto shadow-lg">
                        <tr className="bg-white dark:bg-black">
                            <th colSpan={3} className="p-2">Notifications</th>
                        </tr>
                        {[...notis.entries()].map(([{ seen, createdAt }, { author, color: [bg, text], icon, title, body }], index) => <tr key={index} className={`border-b ${seen ? "bg-white dark:bg-black" : "bg-[#1B5E20] dark:bg-[#D8EDD9] text-[#D8EDD9] dark:text-[#1B5E20] border-l-4 border-[#D8EDD9] dark:border-[#1B5E20]"}`}>
                            <td>
                                <div className={`w-10 h-10 my-4 ml-4 rounded-full flex items-center justify-center text-lg ${bg} ${text}`}>
                                    <i className={`fas ${icon}`}/>
                                </div>
                            </td>
                            <td>
                                <div className="flex flex-col text-xs m-4 w-50 text-start">
                                    <p>@{author} {title}</p>
                                    {body && <p>"{body}"</p>}
                                </div>
                            </td>
                            <td className="pr-4 my-4 text-xs text-end">
                                {dateToString(Math.abs(now.getTime() - new Date(createdAt).getTime()) < day ? "hh:mm" : Math.abs(now.getTime() - new Date(createdAt).getTime()) < year ? "DD/MM" : "YYYY", createdAt)}
                            </td>
                        </tr>)}
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