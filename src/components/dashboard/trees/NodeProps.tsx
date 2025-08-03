import type { PhTreeResponse } from "../../../types";
import { AuthField } from "../../auth/AuthField";
import { deleteSpecies, updateSpecies } from "../../../api/species";
import type { PhTreeWS } from "../../../classes/PhTreeWS";
import { TimeUnit, TreeChange } from "../../../enums";
import { Species, type SpeciesJSON } from "chrono-phylo-tree";
import { nullableInput } from "../../../utils/nullableInput";
import { IconInput } from "../../IconInput";
import { ImageProp } from "./ImageProp";
import type { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";
import { unborder } from "../../../data/classNames";

interface NodePropsProps {
    tree?: PhTreeResponse;
    treeSocket?: PhTreeWS;
    species?: Species;
    setSpecies?: (s?: Species) => void;
    commonAncestors?: Species[]
    setCommonAncestors?: (s: Species[]) => void;
    unit?: TimeUnit;
    setUnit?: (tu: TimeUnit) => void;
    name?: string;
    setName?: (s: string) => void;
    apparition?: number;
    setApparition?: (n: number) => void;
    duration?: number;
    setDuration?: (n: number) => void;
    description?: string;
    setDescription?: (s: string) => void;
    getRootProps?: (props?: DropzoneRootProps) => DropzoneRootProps;
    getInputProps?: (props?: DropzoneInputProps) => DropzoneInputProps;
    isDragActive?: boolean;
}

export const NodeProps = ({
    tree,
    treeSocket,
    species,
    setSpecies,
    commonAncestors,
    setCommonAncestors,
    unit = TimeUnit.Y,
    setUnit,
    name,
    setName,
    apparition,
    setApparition,
    duration,
    setDuration,
    description,
    setDescription,
    getRootProps,
    getInputProps,
    isDragActive
}: NodePropsProps) => {
    const updateProp = <T,>(change: (t: T) => void, data: (t: T) => {
        ancestorId?: string | null;
    } & Partial<Omit<SpeciesJSON, "image">>) => (t: T) => {
        if(species?.id && tree) {
            change(t);
            setSpecies?.(species);
            updateSpecies({
                treeId: tree.id,
                id: species.id.toString(),
                ...data(t)
            }).then(sp => treeSocket?.emit({
                type: TreeChange.EDIT,
                species: sp
            }));
        }
    }
    return (<>
        <AuthField
            name="Species' name"
            type="text"
            placeholder="Name this species..."
            value={name}
            setValue={updateProp(n => {
                if(species) {
                    setName?.(n);
                    species.name = n;
                }
            }, n => ({
                name: n
            }))}
        />
        <AuthField
            name="Ancestor"
            selected={species?.ancestor}
            options={[undefined, ...species?.firstAncestor(true).allDescendants(false).filter(sp => sp.display && sp.id !== species.id) ?? []]}
            optionsDisplay={sp => sp?.name ?? "None (root)"}
            setSelected={updateProp(sp => {
                if(species) {
                    if(!sp) setCommonAncestors?.([...commonAncestors ?? [], ...species.unlinkAncestor() ?? []]);
                    else {
                         if(!species.ancestor) setCommonAncestors?.(commonAncestors?.filter(ca => ca.id !== species.id) ?? [])
                        species.linkAncestor(sp);
                    }
                }
            }, sp => ({
                ancestorId: sp?.id?.toString() ?? null
            }))}
        />
        <AuthField
            name="Time Unit"
            selected={unit}
            setSelected={setUnit}
            options={[TimeUnit.Y, TimeUnit.KY, TimeUnit.MY, TimeUnit.BY, TimeUnit.TY]}
            optionsDisplay={tu => {
                switch(tu) {
                    case TimeUnit.Y: return "Years"
                    case TimeUnit.KY: return "Thousand Years"
                    case TimeUnit.MY: return "Million Years"
                    case TimeUnit.BY: return "Billion Years"
                    case TimeUnit.TY: return "Trillion Years"
                }
            }}
        />
        <AuthField
            name="Apparition"
            type="number"
            placeholder="When did this species appear?..."
            value={nullableInput(species?.apparition, a => (a / unit).toString())}
            min={species?.ancestor?.apparition}
            max={species?.ancestor?.extinction()}
            setValue={updateProp(a => {
                if(species) setApparition?.(+a);
            }, a => ({
                apparition: species?.ancestor ? undefined : +a,
                afterApparition: species?.ancestor ? +a - species.ancestor.apparition : undefined
            }))}
        >
            {species?.ancestor && <IconInput
                type="range"
                className="w-full"
                value={nullableInput(apparition, a => (a / unit).toString())}
                min={species?.ancestor?.apparition / unit}
                max={species?.ancestor?.extinction() / unit}
                setValue={updateProp(a => {
                    if(species) {
                        setApparition?.(+a * unit);
                        species.allDescendants(false).filter(sp => sp.id !== species.id).map(sp => sp.apparition += +a * unit - species.apparition);
                        species.apparition = +a * unit;
                    }
                }, a => ({
                    apparition: species?.ancestor ? undefined : +a,
                    afterApparition: species?.ancestor ? +a - species.ancestor.apparition : undefined
                }))}
                step={1 / unit}
            />}
        </AuthField>
        <AuthField
            name="Duration"
            type="number"
            placeholder="How much time did this species exist?..."
            value={nullableInput(duration, d => (d / unit).toString())}
            min={0}
            setValue={updateProp(d => {
                if(species) {
                    species.allDescendants(false).filter(sp => sp.id !== species.id).map(sp => sp.apparition += +d * unit - species.duration);
                    setDuration?.(+d * unit);
                    species.duration = +d * unit;
                }
            }, d => ({
                duration: +d
            }))}
        />
        <AuthField
            name="Description"
            type="text"
            placeholder="Describe this species"
            value={description}
            setValue={updateProp(d => {
                if(species) {
                    setDescription?.(d);
                    species.description = d;
                }
            }, d => ({
                description: d
            }))}
            textArea
        />
        <ImageProp
            title="Species' Image"
            image={species?.image}
            getRootProps={getRootProps}
            getInputProps={nullableInput(getInputProps, g => props => g({
                accept: [".jpg", ".jpeg", ".png", ".gif", ".svg"].join(),
                multiple: false,
                ...props
            }))}
            isDragActive={isDragActive}
            text={species?.image ? "Update Image" : "Upload Image"}
        />
        <button
            className={"font-bold mb-6 flex flex-row space-x-2 items-center justify-self-end bg-red-700! text-white hover:bg-white! hover:text-red-700 " + unborder}
            onClick={() => {
                if(tree && species && confirm(`Are you sure you wanna delete the species "${species.name}"${species.descendants.length > 0 ? " (and its descendants)" : ""} permanently?`)) deleteSpecies({ treeId: tree.id, id: species.id?.toString()! }).then(() => {
                    const { id, name, duration, descendants, ...sp } = species.toJSON();
                    species.unlinkAncestor();
                    if(id && name && duration !== undefined) treeSocket?.emit({
                        type: TreeChange.DELETE,
                        species: {
                            id,
                            name,
                            duration,
                            treeId: tree.id,
                            ...sp
                        }
                    });
                    alert(`"${species.name}" deleted successfully`);
                    setSpecies?.(undefined);
                })
            }}
        >
            <i className="fas fa-trash"/>
            <p>Delete Species{(species?.descendants.length ?? 0) > 0 ? " (and its descendants)" : ""}</p>
        </button>
    </>)
};