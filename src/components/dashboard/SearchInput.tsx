interface SearchInputProps {
    search?: string;
    setSearch?: (s: string) => void;
}

export const SearchInput = ({
    search,
    setSearch
}: SearchInputProps) => {
    return (
        <>
            <input
                type="text"
                placeholder="Search trees..."
                value={search}
                onChange={e => setSearch?.(e.target.value)}
                className="px-4 py-2 border-y border-l rounded-l max-w-100"
            />
            <a href={(search?.length ?? 0) > 0 ? `/trees?search=${search}` : undefined} className="px-4 flex items-center text-[#1B5E20]! dark:text-[#D8EDD9]! dark:bg-[#1B5E20] bg-[#D8EDD9] rounded-r">
                <i className="fas fa-search"/>
            </a>
        </>
    )
};