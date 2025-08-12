import type { HTMLInputTypeAttribute } from "react";

interface IconInputProps<T> {
    setIcon?: boolean;
    type?: HTMLInputTypeAttribute;
    id?: string;
    placeholder?: string;
    className?: string;
    value?: string;
    setValue?: (s: string) => void;
    checked?: boolean;
    setChecked?: (b: boolean) => void;
    name?: string;
    icon?: string;
    onClick?: () => void;
    buttonClassName?: string;
    selected?: T;
    options?: T[];
    setSelected?: (s: T) => void;
    optionsDisplay?: (t: T) => string;
    textArea?: boolean;
    min?: number;
    max?: number;
    step?: number;
    href?: string;
}

export const IconInput = <T,>({
    setIcon = true,
    type,
    id,
    placeholder,
    className,
    value,
    setValue,
    checked,
    setChecked,
    name,
    icon,
    onClick,
    buttonClassName,
    selected,
    options,
    setSelected,
    optionsDisplay,
    textArea = false,
    min,
    max,
    step,
    href
}: IconInputProps<T>) => {
    return (
        <div className={setIcon ? "relative" : "flex flex-row"}>
            {setValue || setChecked ? (textArea ? <textarea
                id={id}
                placeholder={placeholder}
                className={className}
                value={value}
                onChange={e => setValue?.(e.target.value)}
                name={name?.toLowerCase().replace(" ", "-")}
            /> : <input
                type={type}
                id={id}
                placeholder={placeholder}
                className={className}
                value={value}
                checked={checked}
                onChange={e => {
                    const { value, checked } = e.target;
                    setValue?.(value);
                    setChecked?.(checked)
                }}
                name={name?.toLowerCase().replace(" ", "-")}
                min={min}
                max={max}
                step={step}
            />): undefined}
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
                    {optionsDisplay?.(o) ?? (o as string).toUpperCase()}
                </option>)}
            </select>}
            {setIcon &&
                href ? <a
                    href={href}
                    className={`bg-black/0! p-0! absolute right-[1rem] flex flex-row items-center top-0 bottom-0 border-0! outline-0! ${onClick ? "" : "cursor-not-allowed!"} ${buttonClassName}`}
                >
                    <i className={"fas " + icon}/>
                </a> : <button
                    type="button"
                    className={`bg-black/0! p-0! absolute right-[1rem] flex flex-row items-center top-0 bottom-0 border-0! outline-0! ${onClick ? "" : "cursor-not-allowed!"} ${buttonClassName}`}
                    onClick={onClick}>
                    <i className={"fas " + icon}/>
                </button>}
        </div>
    )
}