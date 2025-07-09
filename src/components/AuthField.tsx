import type { HTMLInputTypeAttribute } from "react";
import { IconInput } from "./IconInput";

interface AuthFieldProps<T> {
    name?: string;
    type?: HTMLInputTypeAttribute;
    id?: string;
    placeholder?: string;
    value?: string;
    setValue?: (s: string) => void;
    visiblePassword?: boolean;
    setVisiblePassword?: (b: boolean) => void;
    children?: any;
    className?: string;
    selected?: T;
    options?: T[];
    setSelected?: (s: T) => void;
}

export const AuthField = <T,>({
    name,
    type,
    id,
    placeholder,
    value,
    setValue,
    visiblePassword,
    setVisiblePassword,
    children,
    className,
    selected,
    options,
    setSelected
}: AuthFieldProps<T>) => {
    return (
        <div className={"flex flex-col mb-6 " + className}>
            <p className="font-bold mb-2">{name}</p>
            <IconInput
                setIcon={!!setVisiblePassword}
                type={type}
                id={id}
                placeholder={placeholder}
                className="pl-[1rem] pr-[2.25rem] py-[0.8rem] border rounded w-full"
                value={value}
                setValue={setValue}
                name={name}
                onClick={() => setVisiblePassword?.(!visiblePassword)}
                icon={visiblePassword ? "fa-eye" : "fa-eye-slash"}
                selected={selected}
                options={options}
                setSelected={setSelected}
            />
            {children}
        </div>
    )
};