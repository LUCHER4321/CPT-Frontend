import { title } from "../../../data/classNames";
import type { UserResponse } from "../../../types";
import { UserCard } from "./UserCard";

interface UsersDataProps {
    titleText?: string;
    users?: UserResponse[];
}

export const UsersData = ({
    titleText,
    users
}: UsersDataProps) => {
    return (
        <>
            <h2 className={"col-span-full text-[2rem] mb-2 " + title}>{titleText}</h2>
            {users?.map((u, index) => <UserCard
                key={index}
                user={u}
            />)}
        </>
    )
}