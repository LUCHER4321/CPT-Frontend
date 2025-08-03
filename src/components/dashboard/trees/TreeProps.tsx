import type { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";
import { deleteTree, updateTree } from "../../../api/phTree";
import { PhTreeWS } from "../../../classes/PhTreeWS";
import { TreeChange } from "../../../enums";
import type { PhTreeResponse } from "../../../types"
import { AuthField } from "../../auth/AuthField";
import { IconInput } from "../../IconInput";
import { ImageProp } from "./ImageProp";
import { unborder } from "../../../data/classNames";
import { useNavigate } from "react-router-dom";
import { nullableInput } from "../../../utils/nullableInput";

interface TreePropsProps {
    tree?: PhTreeResponse;
    setTree?: (t: PhTreeResponse) => void;
    treeSocket?: PhTreeWS;
    tag?: string;
    setTag?: (t: string) => void;
    getRootProps?: (props?: DropzoneRootProps) => DropzoneRootProps;
    getInputProps?: (props?: DropzoneInputProps) => DropzoneInputProps;
    isDragActive?: boolean;
    getRootPropsJSON?: (props?: DropzoneRootProps) => DropzoneRootProps;
    getInputPropsJSON?: (props?: DropzoneInputProps) => DropzoneInputProps;
    isDragActiveJSON?: boolean;
}

export const TreeProps = ({
    tree,
    setTree,
    treeSocket,
    tag,
    setTag,
    getRootProps,
    getInputProps,
    isDragActive,
    getRootPropsJSON,
    getInputPropsJSON,
    isDragActiveJSON
}: TreePropsProps) => {
    const history = useNavigate();
    return (
        <>
            <AuthField
                name="Tree's Name"
                type="text"
                placeholder="Name this phylogenetic tree..."
                value={tree?.name}
                setValue={n => {
                    if(tree) {
                        const { id, name, ...t } = tree;
                        setTree?.({
                            id,
                            name: n,
                            ...t
                        });
                        updateTree({ id, name: n }).then(phTree => treeSocket?.emit({
                            type: TreeChange.TREE,
                            phTree
                        }));
                    }
                }}
            />
            <AuthField
                name="Description"
                placeholder="Describe this phylogenetic tree..."
                value={tree?.description}
                setValue={d => {
                    if(tree) {
                        const { id, description, ...t } = tree;
                        setTree?.({
                            id,
                            description: d.length > 0 ? d : undefined,
                            ...t
                        });
                        updateTree({ id, description: d.length > 0 ? d : undefined }).then(phTree => treeSocket?.emit({
                            type: TreeChange.TREE,
                            phTree
                        }));
                    }
                }}
                textArea
            />
            <AuthField
                name="Visibility"
                selected={tree?.isPublic ? "public" : "private"}
                options={["public", "private"] as ("public" | "private")[]}
                setSelected={(p: "public" | "private") => {
                    if(tree) {
                        const { id, isPublic, ...t } = tree;
                        setTree?.({
                            id,
                            isPublic: p === "public",
                            ...t
                        });
                        updateTree({ id, isPublic: p === "public" }).then(phTree => treeSocket?.emit({
                            type: TreeChange.TREE,
                            phTree
                        }));
                    }
                }}
            />
            <div className="mb-5 flex flex-col">
                <p className="font-bold mb-2">Tags</p>
                <div className="border p-2 rounded flex flex-col">
                    <IconInput
                        name="tag"
                        placeholder="Add tag..."
                        type="text"
                        value={tag}
                        setValue={setTag}
                        className="pl-[1rem] pr-[2.25rem] py-[0.8rem] border rounded w-full"
                        setIcon
                        icon="fa-plus"
                        onClick={(tag?.length ?? 0) > 0 ? () => {
                            if(tree && tag && !tree.tags?.includes(tag)) {
                                const { id, tags, ...t } = tree;
                                setTree?.({
                                    id,
                                    tags: [...tags ?? [], tag],
                                    ...t
                                });
                                updateTree({ id, tags: [...tags ?? [], tag] }).then(phTree => {
                                    treeSocket?.emit({
                                        type: TreeChange.TREE,
                                        phTree
                                    });
                                    setTag?.("");
                                });
                            }
                        } : undefined}
                    />
                    <div className="flex flex-wrap space-x-2 w-full">
                        {tree?.tags?.map(t => (<div className="flex flex-row items-center mt-2 px-2 py-1 space-x-1 rounded-full dark:bg-[#1B5E20] bg-[#D8EDD9]">
                            <span>{t}</span>
                            <i className="fas fa-times cursor-pointer hover:text-red-600" onClick={() => {
                                const { id, tags, ...tr } = tree;
                                setTree?.({
                                    id,
                                    tags: tags?.filter(tg => tg !== t),
                                    ...tr
                                });
                                updateTree({ id, tags: tags?.filter(tg => tg !== t) }).then(phTree => {
                                    treeSocket?.emit({
                                        type: TreeChange.TREE,
                                        phTree
                                    });
                                });
                            }}/>
                        </div>))}
                    </div>
                </div>
            </div>
            <ImageProp
                title="Tree's Image"
                image={tree?.image}
                getRootProps={getRootProps}
                getInputProps={nullableInput(getInputProps, g => props => g({
                    accept: [".jpg", ".jpeg", ".png", ".gif", ".svg"].join(),
                    multiple: false,
                    ...props
                }))}
                isDragActive={isDragActive}
                text={tree?.image ? "Update Image" : "Upload Image"}
            />
            <ImageProp
                title="Upload a JSON"
                getRootProps={getRootPropsJSON}
                getInputProps={nullableInput(getInputPropsJSON, g => props => g({
                    accept: ".json",
                    multiple: false,
                    ...props
                }))}
                isDragActive={isDragActiveJSON}
                text="Upload a JSON"
            />
            <button
                className={"font-bold mb-6 flex flex-row space-x-2 items-center justify-self-end bg-red-700! text-white hover:bg-white! hover:text-red-700 " + unborder}
                onClick={() => {
                    if(tree && confirm(`Are you sure you wanna delete "${tree.name}" permanently?`)) deleteTree({ id: tree.id }).then(() => {
                        alert(`"${tree.name}" deleted successfully`);
                        history("/account");
                    })
                }}
            >
                <i className="fas fa-trash"/>
                <p>Delete Pylogenetic Tree</p>
            </button>
        </>
    )
};