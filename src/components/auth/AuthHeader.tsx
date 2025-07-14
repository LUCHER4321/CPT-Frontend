import { title } from "../../data/classNames";

interface AuthHeaderProps {
    title?: string;
    subTitle?: string;
    className?: string;
}

export const AuthHeader = ({
    title: headerTitle,
    subTitle,
    className
}: AuthHeaderProps) => {
    return (
        <div className={"w-full text-center mb-8 " + className}>
            <h2 className={"text-[2rem] mb-2 " + title}>{headerTitle}</h2>
            <p>{subTitle}</p>
        </div>
    )
}