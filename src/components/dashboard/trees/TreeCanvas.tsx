import type { Ref } from "react";
import type { NodeTSX } from "../../../types"
import { nullableInput } from "../../../utils/nullableInput";

interface TreeCanvasProps {
    children?: NodeTSX | NodeTSX[];
    className?: string;
    zoom?: number;
    ref?: Ref<HTMLDivElement | null>;
    onClic?: () => void;
    width?: number;
    height?: number
}

export const TreeCanvas = ({
    children,
    className,
    zoom = 1,
    ref,
    onClic,
    width = 1,
    height = 1
}: TreeCanvasProps) => {
    const WIDTH = width * zoom;
    const HEIGHT = height * zoom;
    const nodes = nullableInput(children, c => Array.isArray(c) ? c : [c]);
    const diameter = nullableInput(nodes?.length, l => HEIGHT / l) ?? 0;
    const kx = (WIDTH - diameter) / (Math.max(...nodes?.map(({ species }) => species?.extinction() ?? 1) ?? []) - Math.min(...nodes?.map(({ species }) => species?.apparition ?? 0) ?? []));
    return (
        <div
            className={className}
            onClick={onClic}
            ref={ref}
        >
            <svg
                width={WIDTH}
                height={HEIGHT}
                className="bg-green-200 flex-shrink-0"
            >
                {nodes?.map(({ species, ...node }, index) => species && <g key={index}>
                    <line
                        y1={(index + 1 / 2) * diameter}
                        y2={(index + 1 / 2) * diameter}
                        x1={species.apparition * kx}
                        x2={species.extinction() * kx}
                        stroke="black"
                    />
                    <foreignObject
                        x={species.extinction() * kx}
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