import type { Species } from "chrono-phylo-tree"
import type { NodeTSX } from "../../../types"
import { circleImage } from "../../../data/classNames";
import { nullableInput } from "../../../utils/nullableInput";

interface SpNodeProps {
    species?: Species;
    diameter?: number;
    setSpecies?: (sp: Species) => void;
    showNames?: boolean;
    selection?: boolean;
}

export const SpNode = ({
    species,
    diameter,
    setSpecies,
    showNames,
    selection
}: SpNodeProps): NodeTSX => {
    const cursorImage = (selection ? "cursor-pointer" : "") + " absolute bottom-0 right-0 left-0 " + circleImage;
    return {
        species,
        ...(<div
            className={"relative overflow-visible flex flex-row w-full h-full " + cursorImage}
            onClick={selection ? () => nullableInput(species, setSpecies ?? (() => {})) : undefined}
            title={species?.name}
        >
            {species?.image ? <img
                style={{
                    width: diameter,
                    height: diameter
                }}
                src={species.image}
                    className={cursorImage}
            /> : species && <>
                <img
                    style={{
                        width: diameter,
                        height: diameter
                    }}
                    src="/logo.svg"
                    className={"hidden dark:block " + cursorImage}
                />
                <img
                    style={{
                        width: diameter,
                        height: diameter
                    }}
                    src="/logoLight.svg"
                    className={"dark:hidden block " + cursorImage}
                />
            </>}
            {showNames && <div className="absolute top-0 bottom-0 left-full flex justify-start items-center">
                <p className="p-1 rounded bg-white dark:bg-black text-center">
                    {species?.name}
                </p>
            </div>}
        </div>)
    }
}