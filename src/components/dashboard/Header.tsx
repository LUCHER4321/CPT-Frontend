import { title } from "../../data/classNames";
import { Notifications } from "./Notifications";
import { SearchInput } from "./SearchInput";

interface HeaderProps {
    search?: string;
    setSearch?: (s: string) => void;
    count?: number
}

export const Header = ({
    search,
    setSearch,
    count
}: HeaderProps) => {
    return (
        <header className="p-6 flex justify-between items-center w-full shadow-lg">
            <h1 className={"block text-[2em]! font-bold " + title}>Welcome back</h1>
            <div className="flex">
                <Notifications
                    className="flex items-center p-2 mr-6"
                    count={count}
                />
                <SearchInput
                    search={search}
                    setSearch={setSearch}
                />
            </div>
        </header>
    )
};