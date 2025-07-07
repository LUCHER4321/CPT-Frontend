interface HomeButtonProps {
    href?: string
}

export const HomeButton = ({
    href = "/"
}: HomeButtonProps) => {
    return (
        <a href={href}><div className="text-[2rem] font-black text-green-800 dark:text-lime-300">Life Tree</div></a>
    );
};