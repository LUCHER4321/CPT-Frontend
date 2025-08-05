import { Species } from "chrono-phylo-tree";
import { ToolButton } from "./ToolButton";
import { ToggleSwitch } from "../../pricing/ToggleSwitch";
import { createSpecies, deleteSpecies } from "../../../api/species";
import type { PhTreeResponse } from "../../../types";
import type { PhTreeWS } from "../../../classes/PhTreeWS";
import { TreeChange } from "../../../enums";
import { downloadSVG } from "../../../utils/downloadSVG";

interface TreeVisualizationProps {
    children?: any;
    tree?: PhTreeResponse;
    treeSocket?: PhTreeWS;
    selected?: Species;
    setSelected?: (sp?: Species) => void;
    selection?: boolean;
    setSelection?: (b: boolean) => void;
    commonAncerstors?: Species[];
    setCommonAncerstors?: (sl: Species[]) => void;
    chronoScale?: boolean;
    setChronoScale?: (b: boolean) => void;
    showName?: boolean;
    setShowName?: (b: boolean) => void;
    zoom?: number;
    setZoom?: (n: number) => void;
    deltaZoom?: number;
    baseZoom?: number;
    minZoom?: number;
    maxZoom?: number;
    svgId?: string;
}

export const TreeVisualization = ({
    children,
    tree,
    treeSocket,
    selected,
    setSelected,
    selection,
    setSelection,
    commonAncerstors,
    setCommonAncerstors,
    chronoScale,
    setChronoScale,
    showName,
    setShowName,
    zoom = 1,
    setZoom,
    deltaZoom = 0.1,
    baseZoom = 1,
    minZoom = Number.EPSILON,
    maxZoom = Number.MAX_SAFE_INTEGER,
    svgId
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
                        title={selection ? "Moving Mode" : "Selection Mode"}
                        icon={selection ? "fa-hand" : "fa-mouse-pointer"}
                        onClick={() => setSelection?.(!selection)}
                    />
                    <ToolButton
                        title={selected ? "Add Descendant" : "Add Species"}
                        icon="fa-plus-circle"
                        onClick={() => tree ? createSpecies({
                            treeId: tree.id,
                            ancestorId: selected?.id?.toString(),
                            name: "Example Species",
                            ...selected ? {} : {apparition: commonAncerstors?.length ? Math.min(...commonAncerstors.map(ca => ca.apparition)) : 0},
                            ...selected ? {afterApparition: selected.duration} : {},
                            duration: selected ? selected.duration : commonAncerstors?.length ? Math.max(...commonAncerstors.map(ca => ca.duration)) : 1
                        }).then(species => {
                            if(species) {
                                const newSpecies = selected ? selected.addDescendant(species) : Species.fromJSON(species)
                                if(!selected) setCommonAncerstors?.([...commonAncerstors ?? [], newSpecies]);
                                setSelected?.(newSpecies);
                                treeSocket?.emit({
                                    type: TreeChange.NEW,
                                    species
                                });
                            }
                        }) : undefined}
                    />
                    <ToolButton
                        title="Delete Species"
                        icon="fa-minus-circle"
                        enable={selected !== undefined}
                        onClick={() => {
                            if(selected?.id && tree && confirm(`Are you sure you wanna delete the species "${selected.name}"${selected.descendants.length > 0 ? " (and its descendants)" : ""} permanently?`)) deleteSpecies({
                                treeId: tree.id,
                                id: selected.id.toString()
                            }).then(() => {
                                if(selected.ancestor) selected.unlinkAncestor();
                                else setCommonAncerstors?.(commonAncerstors?.filter(ca => ca.id !== selected.id) ?? []);
                                const { id, name, duration, descendants, ...species } = selected.toJSON();
                                setSelected?.();
                                if(id && name && duration !== undefined) treeSocket?.emit({
                                    type: TreeChange.DELETE,
                                    species: {
                                        treeId: tree.id,
                                        id,
                                        name,
                                        duration,
                                        ...species
                                    }
                                });
                            });
                        }}
                    />
                    {false && <ToolButton
                        title={`Download "${tree?.name}.svg"`}
                        icon="fa-download"
                        onClick={() => downloadSVG(svgId, tree?.name)}
                    />}
                    <p>Zoom: {(zoom / baseZoom * 100).toFixed()}%</p>
                </div>
                <div className="flex flex-col space-y-2">
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
                    <div className="flex flex-row space-x-2">
                        <ToggleSwitch
                            id="show-name"
                            className={"w-15 h-7.5 " + (showName ? "bg-[#D8EDD9] dark:bg-[#1B5E20]" : "bg-neutral-200 dark:bg-neutral-700")}
                            spanClassName="bg-white"
                            checked={showName}
                            onChange={setShowName}
                        />
                        <p className="font-bold">Show Names</p>
                    </div>
                </div>
            </header>
            <div className="relative h-full! w-full!">
                {children}
            </div>
        </div>
    )
}