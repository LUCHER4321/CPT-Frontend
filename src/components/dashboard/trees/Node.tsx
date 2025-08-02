import type { Species } from "chrono-phylo-tree"
import type { NodeTSX } from "../../../types"
import { circleImage } from "../../../data/classNames";

interface SpNodeProps {
    species?: Species;
    diameter?: number;
}

export const SpNode = ({
    species,
    diameter
}: SpNodeProps): NodeTSX => {
    return {
        species,
        ...(species?.image ? <img
            style={{
                width: diameter,
                height: diameter
            }}
            src={species.image}
            title={species.name}
            className={"cursor-pointer " + circleImage}
        /> : <></>)
    }
}