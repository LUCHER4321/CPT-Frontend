import type { HTMLInputTypeAttribute } from "react";
import { IconInput } from "./IconInput";

interface AuthFieldProps {
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
}

export const AuthField = ({
    name,
    type,
    id,
    placeholder,
    value,
    setValue,
    visiblePassword,
    setVisiblePassword,
    children,
    className
}: AuthFieldProps) => {
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
            />
            {children}
        </div>
    )
};