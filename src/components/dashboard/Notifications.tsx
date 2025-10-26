interface NotificationsProps {
    className?: string;
    count?: number;
    children?: any;
    active?: boolean;
    setActive?: (b: boolean) => void;
}

export const Notifications = ({
    className,
    count,
    children,
    active,
    setActive
}: NotificationsProps) => {
    return (
        <button className={className} onClick={() => setActive?.(!active)}>
            <i className="fas fa-bell relative">
                {count ? <span className="absolute left-1/2 bottom-1/2 dark:bg-[#1B5E20] bg-[#D8EDD9] aspect-square min-w-6.5 rounded flex items-center justify-center text-xs p-1">{count > 9 ? "9+" : count}</span> : <></>}
                {active && children}
            </i>
        </button>
    )
};