import type { Species } from "chrono-phylo-tree"
import type { NodeTSX } from "../../../types"
import { circleImage } from "../../../data/classNames";
import { nullableInput } from "../../../utils/nullableInput";

interface SpNodeProps {
    species?: Species;
    diameter?: number;
    setSpecies?: (sp: Species) => void;
}

const cursorImage = "cursor-pointer absolute bottom-0 right-0 left-0 " + circleImage;

export const SpNode = ({
    species,
    diameter,
    setSpecies
}: SpNodeProps): NodeTSX => {
    return {
        species,
        ...(<div
            className={"relative w-full h-full " + cursorImage}
            onClick={() => nullableInput(species, setSpecies ?? (() => {}))}
            title={species?.name}
        >
            {species?.image ? <img
                style={{
                    width: diameter,
                    height: diameter
                }}
                src={species.image}
            /> : species && <>
                <img
                    style={{
                        width: diameter,
                        height: diameter
                    }}
                    src="/logo.svg"
                />
                <img
                    style={{
                        width: diameter,
                        height: diameter
                    }}
                    src="/logoLight.svg"
                />
            </>}
            <div className="absolute bottom-0 right-0 left-0 flex justify-center items-end">
                <p className="px-2 py-1 bg-white dark:bg-black rounded-full text-center">
                    {species?.name}
                </p>
            </div>
        </div>)
    }
}