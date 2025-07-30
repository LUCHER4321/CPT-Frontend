import type { Species } from "chrono-phylo-tree";
import { ToolButton } from "./ToolButton";
import { ToggleSwitch } from "../../pricing/ToggleSwitch";

interface TreeVisualizationProps {
    children?: any;
    selected?: Species;
    chronoScale?: boolean;
    setChronoScale?: (b: boolean) => void;
}

export const TreeVisualization = ({
    children,
    selected,
    chronoScale,
    setChronoScale
}: TreeVisualizationProps) => {
    return (
        <div className="flex flex-col my-2 ml-2 shadow-lg overflow-hidden size-full">
            <header className="flex flex-row p-3 justify-between border-b items-center">
                <div className="flex flex-row space-x-2">
                    <ToolButton
                        title="Zoom In"
                        icon="fa-search-plus"
                    />
                    <ToolButton
                        title="Zoom Out"
                        icon="fa-search-minus"
                    />
                    <ToolButton
                        title="Center View"
                        icon="fa-crosshairs"
                    />
                    <ToolButton
                        title="Selection Mode"
                        icon="fa-mouse-pointer"
                    />
                    <ToolButton
                        title={selected ? "Add Descendant" : "Add Species"}
                        icon="fa-plus-circle"
                    />
                    <ToolButton
                        title={"Delete Species"}
                        icon="fa-minus-circle"
                        enable={selected !== undefined}
                    />
                </div>
                <div className="flex flex-row space-x-2">
                    <ToggleSwitch
                        id="chrono-scale"
                        className={"w-15 h-7.5 " + (chronoScale ? "bg-[#D8EDD9] dark:bg-[#1B5E20]" : "bg-neutral-200 dark:bg-neutral-700")}
                        spanClassName="bg-white"
                        checked={chronoScale}
                        onChange={setChronoScale}
                    />
                    <p className="font-bold">Chronological Scale</p>
                </div>
            </header>
            {children}
        </div>
    )
}