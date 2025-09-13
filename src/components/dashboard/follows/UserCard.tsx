import { card, circleImage, title } from "../../../data/classNames";
import type { UserResponse } from "../../../types"
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";
import { dateToString } from "../../../utils/dateToString";
import { nullableInput } from "../../../utils/nullableInput";

interface UserCardProps {
    user?: UserResponse;
}

export const UserCard = ({ user } : UserCardProps) => {
    const { id, username, createdAt, photo, plan } = user ?? {};
    return (
        <a className={card + " " + title} href={`/profiles/${id}`}>
            <div className="flex flex-row justify-between p-4 items-center">
                <div className="flex flex-col text-start">
                    <h3 className={"text-start text-[1.17em] " + title}>@{username}</h3>
                    <p>{nullableInput(plan, capitalizeFirstLetter)} Plan</p>
                    <p>Member since: {dateToString("MMn YYYY", createdAt)}</p>
                </div>
                {photo ? <img src={photo} className={"h-10! w-10! " + circleImage}/> : <i className={"fas fa-user text-4xl h-10! w-10! " + title}/>}
            </div>
        </a>
    )
};