import type { HTMLInputTypeAttribute } from "react";

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
            <div className={setVisiblePassword ? "relative" : "flex flex-row"}>
                <input
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    className="pl-[1rem] pr-[2.25rem] py-[0.8rem] border rounded w-full"
                    value={value}
                    onChange={e => setValue?.(e.target.value)}
                    name={name?.toLowerCase()}
                />
                {setVisiblePassword &&
                    <button
                        type="button"
                        className="bg-black/0! p-0! absolute right-[1rem] flex items-center top-0 bottom-0 border-0! outline-0!"
                        onClick={() => setVisiblePassword(!visiblePassword)}>
                        <i className={"fas " + (visiblePassword ? "fa-eye" : "fa-eye-slash")}/>
                    </button>
                }
            </div>
            {children}
        </div>
    )
};