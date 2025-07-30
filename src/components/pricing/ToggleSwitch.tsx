interface ToggleSwitchProps {
    id?: string;
    peer?: string;
    checked?: boolean;
    onChange?: (b: boolean) => void;
    className?: string;
    spanClassName?: string;
}

export const ToggleSwitch = ({
    id,
    peer = "peer",
    checked,
    onChange,
    className,
    spanClassName
}: ToggleSwitchProps) => {
    return (
        <label htmlFor={id} className={"rounded-full relative cursor-pointer transition-all duration-500 " + className}>
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={e => onChange?.(e.target.checked)}
                className={"sr-only " + peer}
            />
            <span className={"w-2/5 aspect-square absolute rounded-full left-1/20 top-1/10 peer-checked:left-11/20 transition-all duration-500 " + spanClassName}/>
        </label>
    )
}