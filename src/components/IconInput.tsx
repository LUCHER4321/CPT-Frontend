import type { HTMLInputTypeAttribute } from "react";

interface IconInputProps<T> {
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
    buttonClassName?: string;
    selected?: T;
    options?: T[];
    setSelected?: (s: T) => void;
}

export const IconInput = <T,>({
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
    buttonClassName,
    selected,
    options,
    setSelected
}: IconInputProps<T>) => {
    return (
        <div className={setIcon ? "relative" : "flex flex-row"}>
            {setValue && <input
                type={type}
                id={id}
                placeholder={placeholder}
                className={className}
                value={value}
                onChange={e => setValue(e.target.value)}
                name={name?.toLowerCase().replace(" ", "-")}
            />}
            {setSelected && <select
                value={selected as string}
                onChange={e => setSelected(e.target.value as T)}
                className={className}
                id={id}
                name={name?.toLowerCase().replace(" ", "-")}
            >
                {options?.map((o, index) => <option
                    value={o as string}
                    key={index}
                    className="dark:bg-black"
                >
                    {(o as string).toUpperCase()}
                </option>)}
            </select>}
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