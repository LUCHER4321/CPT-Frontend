import type { NotificationResponse, NotificationString } from "../../types";
import { dateToString } from "../../utils/dateToString";

interface NotificationProps {
    notification?: NotificationResponse;
    notiString?: NotificationString;
    now?: Date;
}

const day = 24 * 3600000;
const year = 365.25 * day;

export const Notification = ({
    notification,
    notiString,
    now = new Date()
}: NotificationProps) => {
    const { seen, createdAt } = notification ?? { createdAt: new Date() };
    const { author, color: [bg, text], icon, title, body, url } = notiString ?? { color: [undefined, undefined] };
    return (
        <tr className={`border-b ${seen ? "bg-white dark:bg-black" : "bg-[#1B5E20] dark:bg-[#D8EDD9] border-l-4 border-[#D8EDD9] dark:border-[#1B5E20]"}`}>
            <a href={url} className={`${seen ? "text-black! dark:text-white!" : "text-[#D8EDD9] dark:text-[#1B5E20]"}`}>
            <td>
                <div className={`w-10 h-10 my-4 ml-4 rounded flex items-center justify-center text-lg ${bg} ${text}`}>
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
            </a>
        </tr>);
}