interface LinkButtonProps {
    href?: string;
    className?: string
    children?: any;
}

export const LinkButton = ({
    href,
    className,
    children
}: LinkButtonProps) => {
    return (
        <a href={href}><button className={className}>{children}</button></a>
    );
};