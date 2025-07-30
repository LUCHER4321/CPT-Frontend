import { Notifications } from "./Notifications";
import { SearchInput } from "./SearchInput";

interface HeaderProps {
    search?: string;
    setSearch?: (s: string) => void;
    count?: number;
    active?: boolean;
    setActive?: (b: boolean) => void;
    children?: any;
}

export const Header = ({
    search,
    setSearch,
    count,
    active,
    setActive,
    children
}: HeaderProps) => {
    return (
        <header className="p-6 flex flex-col sm:flex-row justify-between items-center w-full shadow-lg">
            {children}
            <div className="flex flex-row-reverse sm:flex-row justify-between w-full sm:w-auto pt-5 sm:pt-0">
                <Notifications
                    className="flex items-center p-0! sm:p-2! bg-black/0! border-black/0! focus:outline-0! focus-visible:outline-0! mr-6"
                    count={count}
                    active={active}
                    setActive={setActive}
                >
                    <button className="bg-black/0! fixed top-0 bottom-0 left-0 right-0 rounded-none! border-black/0! focus:outline-0! focus-visible:outline-0!" onClick={() => setActive?.(false)}/>
                </Notifications>
                <SearchInput
                    search={search}
                    setSearch={setSearch}
                />
            </div>
        </header>
    )
};