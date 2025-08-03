import type { Ref } from "react";
import type { NodeTSX } from "../../../types"
import { nullableInput } from "../../../utils/nullableInput";
import { TimeUnit } from "../../../enums";
import type { Species } from "chrono-phylo-tree";
import { percentile } from "../../../utils/average";

interface TreeCanvasProps {
    children?: NodeTSX | NodeTSX[];
    className?: string;
    zoom?: number;
    ref?: Ref<HTMLDivElement | null>;
    onClic?: () => void;
    width?: number;
    height?: number;
    unit?: TimeUnit;
    chronoScale?: boolean;
    minHeight?: number;
    minWidth?: number;
}

export const TreeCanvas = ({
    children,
    className,
    zoom = 1,
    ref,
    onClic,
    width = 1,
    height = 1,
    chronoScale,
    minHeight = 0,
    minWidth = 0
}: TreeCanvasProps) => {
    const WIDTH = (width) * zoom;
    const HEIGHT = (height) * zoom;
    const MIN_HEIGHT = minHeight * zoom;
    const MIN_WIDTH = minWidth * zoom;
    const nodes = nullableInput(children, c => Array.isArray(c) ? c : [c]);
    const diameter = nullableInput(nodes?.length, l => Math.max(HEIGHT / l, MIN_HEIGHT)) ?? 0;
    const FINAL_HEIGHT = diameter * (nodes?.length ?? 0);
    const kx = Math.max(MIN_WIDTH / (chronoScale ? percentile(0.01, ...nodes?.map(({ species }) => species?.duration) ?? []) : 1), (WIDTH - diameter) / Math.max(...nodes?.map(({ species }) => (chronoScale ? species?.absoluteDuration() : species?.firstAncestor().stepsUntil(species)) ?? 1) ?? []));
    const FINAL_WIDTH = Math.max(WIDTH, diameter + kx * Math.max(...nodes?.map(({ species }) => (chronoScale ? species?.absoluteDuration() : species?.firstAncestor().stepsUntil(species)) ?? 1) ?? []));
    const firstApparition =  Math.min(...nodes?.map(({ species }) => species?.apparition).filter(a => a !== undefined) ?? []);
    const x1 = (species: Species) => (chronoScale ? species.apparition - firstApparition : (species.firstAncestor().stepsUntil(species) ?? 0)) * kx;
    const x2 = (species: Species) => (chronoScale ? species.extinction() - firstApparition : ((species.firstAncestor().stepsUntil(species) ?? 0) + 1)) * kx;
    const y = (index: number) => (index + 1 / 2) * diameter;

    const rep = (apparition?: number) => {
        if(apparition === undefined) return "";
        if(apparition === 0) return "0Y";
        for(const [k, v] of Object.entries(TimeUnit).reverse()){
            if(Math.abs(apparition) >= +v) {
                return (apparition / +v).toFixed(2) + k;
            }
        }
    };

    return (
        <div
            className={"flex " + (FINAL_HEIGHT > height ? "overflow-y-scroll items-start " : "items-center ") + (FINAL_WIDTH > width ? "overflow-x-scroll justify-start " : "justify-center ") + className}
            onClick={onClic}
            ref={ref}
        >
            <svg
                width={FINAL_WIDTH}
                height={FINAL_HEIGHT}
                className="flex-shrink-0"
            >
                {nodes?.map(({ species, ...node }, index) => species && <g key={index}>
                    <line
                        y1={y(index)}
                        y2={y(index)}
                        x1={x1(species)}
                        x2={x2(species)}
                        stroke="black"
                    />
                    {nodes.map(({ species: sp }, index1) => sp && species.descendants.map(d => d.id).includes(sp.id) && <line
                        key={index1}
                        y1={y(index)}
                        y2={y(index1)}
                        x1={x1(sp)}
                        x2={x1(sp)}
                        stroke="black"
                    />)}
                    {chronoScale && <foreignObject
                        x={x1(species)}
                        y={y(index)}
                        width={(chronoScale ? species.duration : 1) * kx}
                        height={diameter / 2}
                    >
                        <div className="w-full flex flex-row justify-between">
                            <p className="text-black">{rep(species.apparition)}</p>
                            <p className="text-black">{rep(species.extinction())}</p>
                        </div>
                    </foreignObject>}
                    <foreignObject
                        x={x2(species)}
                        y={index * diameter}
                        width={diameter}
                        height={diameter}
                    >
                        {node}
                    </foreignObject>
                </g>)}
            </svg>
        </div>
    )
}