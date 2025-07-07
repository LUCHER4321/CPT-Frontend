import type { HTMLInputTypeAttribute } from "react";

interface IconInputProps {
    setIcon?: boolean;
    type?: HTMLInputTypeAttribute;
    id?: string;
    placeholder?: string;
    className?: string;
    value?: string;
    setValue?: (s: string) => void;
    name?: string;
    icon?: string;
    onClick?: () => void;
    buttonClassName?: string
}

export const IconInput = ({
    setIcon = true,
    type,
    id,
    placeholder,
    className,
    value,
    setValue,
    name,
    icon,
    onClick,
    buttonClassName
}: IconInputProps) => {
    return (
        <div className={setIcon ? "relative" : "flex flex-row"}>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                className={className}
                value={value}
                onChange={e => setValue?.(e.target.value)}
                name={name?.toLowerCase().replace(" ", "-")}
            />
            {setIcon &&
                <button
                    type="button"
                    className={"bg-black/0! p-0! absolute right-[1rem] flex items-center top-0 bottom-0 border-0! outline-0! " + buttonClassName}
                    onClick={onClick}>
                    <i className={"fas " + icon}/>
                </button>}
        </div>
    )
}