import { title } from "../../../data/classNames";

interface SettingsSectionProps {
    icon?: string;
    name?: string;
    className?: string;
    bodyClassName?: string;
    children?: any;
}

export const SettingsSection = ({
    icon,
    name,
    className,
    bodyClassName,
    children
}: SettingsSectionProps) => {
    return (
        <section className={"mb-10 " + className}>
            <h2 className={"text-[2rem] mb-2 " + title}><i className={`fas ${icon}`} /> {name}</h2>
            <div className={"p-8 rounded mb-6 shadow " + bodyClassName}>
                {children}
            </div>
        </section>
    )
};