interface HomeButtonProps {
    href?: string
}

export const HomeButton = ({
    href = "/"
}: HomeButtonProps) => {
    return (
        <a href={href}><div className="text-[2rem] font-black text-[#1B5E20]! dark:text-[#D8EDD9]!">Life Tree</div></a>
    );
};