interface LinkButtonProps {
    href?: string;
    className?: string;
    blank?: boolean;
    children?: any;
}

export const LinkButton = ({
    href,
    className,
    blank,
    children
}: LinkButtonProps) => {
    return (
        <a href={href} target={blank ? "_blank" : undefined}><button className={className}>{children}</button></a>
    );
};