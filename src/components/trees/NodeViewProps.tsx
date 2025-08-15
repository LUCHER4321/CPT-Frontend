import type { Species } from "chrono-phylo-tree";
import { AuthField } from "../auth/AuthField";
import { timeRep } from "../../utils/timeRep";
import { circleImage } from "../../data/classNames";

interface NodeViewPropsProps {
    species?: Species;
    setSpecies?: (s?: Species) => void;
    commonAncestors?: Species[]
}

export const NodeViewProps = ({
    species,
    setSpecies,
    commonAncestors
} : NodeViewPropsProps) => {
    const speciesList = [undefined, ...commonAncestors?.flatMap(ca => ca.allDescendants(false)).sort((a, b) => a.name.localeCompare(b.name)) ?? []];
    return (
        <>
            <AuthField
                name="Species"
                selected={species?.id ?? ""}
                options={speciesList.map(sp => sp?.id ?? "")}
                optionsDisplay={id => speciesList.find(sp => sp?.id === id)?.name ?? "None (root)"}
                setSelected={id => setSpecies?.(speciesList.find(s => s?.id === id))}
            />
            {species && <>
                <h2 className={"font-bold text-xl mb-2"}>{species.name}</h2>
                {species.image && <img src={species.image} className={"h-70! w-70! self-center mb-2 " + circleImage} />}
                <p className="mb-1">{species.apparition < 0 ? "(" : ""}{timeRep(species.apparition)}{species.apparition < 0 ? ")" : ""}-{species.extinction() < 0 ? "(" : ""}{timeRep(species.extinction())}{species.extinction() < 0 ? ")" : ""}</p>
                <p className="mb-2">{species.description}</p>
            </>}
        </>
    )
}