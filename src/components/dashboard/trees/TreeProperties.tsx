import { unborder } from "../../../data/classNames";
import { treeProps } from "../../../data/treeProps";
import { TreeProp } from "../../../enums";

interface TreePropertiesProps {
    children?: any;
    prop?: TreeProp;
    setProp?: (p: TreeProp) => void;
    view?: boolean;
    open?: boolean;
    setOpen?: (o: boolean) => void;
}

export const TreeProperties = ({
    children,
    prop,
    setProp,
    view,
    open
}: TreePropertiesProps) => {
    return (
        <div className={`sm:min-w-88 sm:max-w-88 sm:h-full m-2 rounded shadow-lg flex flex-col overflow-scroll sm:overflow-hidden ${open ? "absolute sm:relative left-0 right-0 top-45 bottom-0" :
        "hidden sm:flex"}`}>
            <div className="grid border-b grid-cols-3">
                {[...treeProps.entries()].filter(([k]) => (!view || k !== TreeProp.COLLABORATORS) && (view || k !== TreeProp.COMMENTS)).map(([k, { icon, name }], index) => (
                    <button
                        className={`flex flex-col space-y-2.5 rounded-none! bg-black/0! transition-all! text-xs! duration-300 ${unborder} ${k === prop ? "text-[#1B5E20]! dark:text-[#D8EDD9]! border-b-2! border-[#1B5E20]! dark:border-[#D8EDD9]!" : ""}`}
                        key={index}
                        onClick={() => setProp?.(k)}
                    >
                        <i className={"text-lg fas " + icon}/>
                        <span>{name}</span>
                    </button>
                ))}
            </div>
            {children}
        </div>
    )
};