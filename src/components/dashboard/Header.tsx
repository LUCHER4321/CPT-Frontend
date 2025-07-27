import { title } from "../../data/classNames";
import { Notifications } from "./Notifications";
import { SearchInput } from "./SearchInput";

interface HeaderProps {
    search?: string;
    setSearch?: (s: string) => void;
    count?: number;
    active?: boolean;
    setActive?: (b: boolean) => void;
}

export const Header = ({
    search,
    setSearch,
    count,
    active,
    setActive
}: HeaderProps) => {
    return (
        <header className="p-6 flex flex-col sm:flex-row justify-between items-center w-full shadow-lg">
            <h1 className={"block text-[2em]! font-bold " + title}>Welcome back</h1>
            <div className="flex flex-row-reverse sm:flex-row justify-between w-full sm:w-auto pt-5 sm:pt-0">
                <Notifications
                    className="flex items-center p-0! sm:p-2! bg-black/0! border-black/0! focus:outline-0! focus-visible:outline-0! mr-6"
                    count={count}
                    active={active}
                    setActive={setActive}
                ></Notifications>
                <SearchInput
                    search={search}
                    setSearch={setSearch}
                />
            </div>
        </header>
    )
};