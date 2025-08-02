import type { Species } from "chrono-phylo-tree";
import { ToolButton } from "./ToolButton";
import { ToggleSwitch } from "../../pricing/ToggleSwitch";

interface TreeVisualizationProps {
    children?: any;
    selected?: Species;
    commonAncerstors?: Species[];
    setCommonAncerstors?: (sl: Species[]) => void;
    chronoScale?: boolean;
    setChronoScale?: (b: boolean) => void;
    zoom?: number;
    setZoom?: (n: number) => void;
    deltaZoom?: number;
    baseZoom?: number;
    minZoom?: number;
    maxZoom?: number;
}

export const TreeVisualization = ({
    children,
    selected,
    chronoScale,
    setChronoScale,
    zoom = 1,
    setZoom,
    deltaZoom = 0.1,
    baseZoom = 1,
    minZoom = Number.EPSILON,
    maxZoom = Number.MAX_SAFE_INTEGER
}: TreeVisualizationProps) => {
    return (
        <div className="flex flex-col my-2 ml-2 shadow-lg overflow-hidden h-full! w-full!">
            <header className="flex flex-row p-3 justify-between border-b items-center">
                <div className="flex flex-row space-x-3 items-center">
                    <ToolButton
                        title="Zoom In"
                        icon="fa-search-plus"
                        onClick={() => setZoom?.(Math.min(zoom + baseZoom * deltaZoom, maxZoom * baseZoom))}
                    />
                    <ToolButton
                        title="Zoom Out"
                        icon="fa-search-minus"
                        onClick={() => setZoom?.(Math.max(zoom - baseZoom * deltaZoom, minZoom * baseZoom))}
                    />
                    <ToolButton
                        title="Center View"
                        icon="fa-crosshairs"
                        onClick={() => setZoom?.(baseZoom)}
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
                    <p>Zoom: {(zoom / baseZoom * 100).toFixed()}%</p>
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
            <div className="relative h-full! w-full!">
                {children}
            </div>
        </div>
    )
}