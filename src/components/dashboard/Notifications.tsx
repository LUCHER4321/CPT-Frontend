interface NotificationsProps {
    className?: string;
    count?: number;
}

export const Notifications = ({
    className,
    count
}: NotificationsProps) => {
    return (
        <div className={className}>
            <i className="fas fa-bell relative">
                {count ? <span className="absolute left-1/2 bottom-1/2 dark:bg-[#1B5E20] bg-[#D8EDD9] aspect-square min-w-6.5 rounded-full flex items-center justify-center text-xs p-1">{count > 9 ? "9+" : count}</span> : <></>}
            </i>
        </div>
    )
};