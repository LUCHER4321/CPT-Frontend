import type { MouseEvent, Ref, UIEvent, WheelEvent } from "react";
import type { NodeTSX } from "../../../types"
import { nullableInput } from "../../../utils/nullableInput";
import { TimeUnit } from "../../../enums";
import { Species } from "chrono-phylo-tree";
import { order, percentile } from "../../../utils/average";

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
    grids?: boolean;
    svgId?: string;
    scrollLeft?: number;
    scrollTop?: number;
    onMouseDown?: (e: MouseEvent) => void;
    onMouseMove?: (e: MouseEvent, scrollLeft?: number, scrollTop?: number) => void;
    onMouseUp?: (e: MouseEvent) => void;
    onScroll?: (e: UIEvent) => void;
    onWheel?: (e: WheelEvent) => void;
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
    minWidth = 0,
    grids,
    svgId,
    scrollLeft = 0,
    scrollTop = 0,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onScroll,
    onWheel,
}: TreeCanvasProps) => {
    const dMult = 2.5;
    const mult = 10;
    const WIDTH = width * zoom;
    const HEIGHT = height * zoom;
    const MIN_HEIGHT = minHeight * zoom;
    const MIN_WIDTH = minWidth * zoom;
    const nodes = nullableInput(children, c => Array.isArray(c) ? c : [c]);
    const diameter = nullableInput(nodes?.length, l => Math.max(HEIGHT / l, MIN_HEIGHT)) ?? 0;
    const FINAL_HEIGHT = diameter * (nodes?.length ?? 0);
    const minDuration = chronoScale ? order(percentile(0.1, ...nodes?.map(({ species }) => species?.duration) ?? [])) : 1;
    const kx = Math.max(MIN_WIDTH / minDuration, (WIDTH - dMult * diameter) / Math.max(...nodes?.map(({ species }) => (chronoScale ? species?.absoluteDuration() : species?.firstAncestor().stepsUntil(species)) ?? 1) ?? []));
    const FINAL_WIDTH = Math.max(WIDTH, dMult * diameter + kx * Math.max(...nodes?.map(({ species }) => (chronoScale ? nullableInput(species, sp => sp.extinction() - sp.firstAncestor().apparition) : species?.firstAncestor().stepsUntil(species)) ?? 1) ?? []));
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
            onMouseDown={onMouseDown}
            onMouseMove={e => onMouseMove?.(e, scrollLeft, scrollTop)}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onScroll={onScroll}
            onWheel={onWheel}
            tabIndex={0}
            id={svgId}
        >
            <svg
                width={FINAL_WIDTH}
                height={FINAL_HEIGHT}
                className="flex-shrink-0"
            >
                {grids && [...Array(Math.ceil(FINAL_WIDTH / MIN_WIDTH) * mult).keys()].map(n => {
                    const xn = (chronoScale ? (n + Math.ceil(firstApparition * mult / minDuration)) * minDuration / mult - firstApparition : (n / mult)) * kx;
                    return <line
                        key={n}
                        y1={0}
                        y2={FINAL_HEIGHT}
                        x1={xn}
                        x2={xn}
                        stroke="#7F7F7F"
                    />
                })}
                {grids && [...Array(Math.ceil(FINAL_HEIGHT / MIN_WIDTH) * mult).keys()].map(n => {
                    const yn = n * minDuration * kx / mult;
                    return <line
                        key={n}
                        y1={yn}
                        y2={yn}
                        x1={0}
                        x2={FINAL_WIDTH}
                        stroke="#7F7F7F"
                    />
                })}
                {nodes?.map(({ species, ...node }, index) => species && <g key={index}>
                    <line
                        y1={y(index)}
                        y2={y(index)}
                        x1={x1(species)}
                        x2={x2(species)}
                        stroke="black"
                        className="block dark:hidden"
                    />
                    <line
                        y1={y(index)}
                        y2={y(index)}
                        x1={x1(species)}
                        x2={x2(species)}
                        stroke="white"
                        className="dark:block hidden"
                    />
                    {nodes.map(({ species: sp }, index1) => sp && species.descendants.map(d => d.id).includes(sp.id) && <g key={index1}>
                        <line
                            y1={y(index)}
                            y2={y(index1)}
                            x1={x1(sp)}
                            x2={x1(sp)}
                            stroke="black"
                            className="block dark:hidden"
                        />
                        <line
                            y1={y(index)}
                            y2={y(index1)}
                            x1={x1(sp)}
                            x2={x1(sp)}
                            stroke="white"
                            className="dark:block hidden"
                        />
                    </g>)}
                    {chronoScale && <foreignObject
                        x={x1(species)}
                        y={y(index)}
                        width={(chronoScale ? species.duration : 1) * kx}
                        height={diameter / 2}
                    >
                        <div className="w-full flex flex-row justify-between">
                            <p>{rep(species.apparition)}</p>
                            <p>{rep(species.extinction())}</p>
                        </div>
                    </foreignObject>}
                    <foreignObject
                        x={x2(species)}
                        y={index * diameter}
                        width={diameter}
                        height={diameter}
                        className="overflow-visible"
                    >
                        {node}
                    </foreignObject>
                </g>)}
            </svg>
        </div>
    )
}