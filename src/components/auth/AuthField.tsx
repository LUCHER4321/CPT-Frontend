import type { HTMLInputTypeAttribute } from "react";
import { IconInput } from "../IconInput";

interface AuthFieldProps<T> {
    name?: string;
    type?: HTMLInputTypeAttribute;
    id?: string;
    placeholder?: string;
    value?: string;
    setValue?: (s: string) => void;
    checked?: boolean;
    setChecked?: (b: boolean) => void;
    visiblePassword?: boolean;
    setVisiblePassword?: (b: boolean) => void;
    children?: any;
    className?: string;
    selected?: T;
    options?: T[];
    setSelected?: (s: T) => void;
    optionsDisplay?: (t: T) => string;
    textArea?: boolean;
    setIcon?: boolean;
    icon?: string;
    min?: number;
    max?: number;
    onClick?: () => void;
    row?: boolean;
}

export const AuthField = <T,>({
    name,
    type,
    id,
    placeholder,
    value,
    setValue,
    checked,
    setChecked,
    visiblePassword,
    setVisiblePassword,
    children,
    className,
    selected,
    options,
    setSelected,
    optionsDisplay,
    textArea,
    setIcon,
    icon,
    min,
    max,
    onClick,
    row
}: AuthFieldProps<T>) => {
    return (
        <section className={"flex mb-6 " + (row ? "flex-row " : "flex-col ") + className}>
            <p className="font-bold mb-2">{name}</p>
            <IconInput
                setIcon={!!setVisiblePassword || setIcon}
                type={type}
                id={id}
                placeholder={placeholder}
                className={"pl-[1rem] py-[0.8rem] border rounded w-full " + (setVisiblePassword ? "pr-[2.25rem]" : "pr-[1rem]")}
                value={value}
                setValue={setValue}
                checked={checked}
                setChecked={setChecked}
                name={name}
                onClick={icon ? onClick : (() => setVisiblePassword?.(!visiblePassword))}
                icon={icon ?? (setVisiblePassword ? (visiblePassword ? "fa-eye" : "fa-eye-slash") : undefined)}
                selected={selected}
                options={options}
                setSelected={setSelected}
                optionsDisplay={optionsDisplay}
                textArea={textArea}
                min={min}
                max={max}
            />
            {children}
        </section>
    )
};