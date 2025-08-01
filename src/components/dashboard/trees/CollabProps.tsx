import { updateTree } from "../../../api/phTree";
import type { PhTreeWS } from "../../../classes/PhTreeWS";
import { TreeChange } from "../../../enums";
import type { PhTreeResponse, UserResponse } from "../../../types";
import { AuthField } from "../../auth/AuthField";

interface CollabPropsProps {
    tree?: PhTreeResponse;
    user?: UserResponse;
    collab?: string;
    setCollab?: (s: string) => void;
    search?: UserResponse[];
    treeSocket?: PhTreeWS;
    currentCollab?: UserResponse[];
}

export const CollabProps = ({
    tree,
    user,
    collab,
    setCollab,
    search,
    treeSocket,
    currentCollab
}: CollabPropsProps) => {
    return (
        <>
            <AuthField
                name="Add Collaborator"
                placeholder="Search User..."
                className="relative"
                type="text"
                value={collab}
                setValue={setCollab}
                setIcon
                icon="fa-plus"
                onClick={(collab?.length ?? 0) > 0 ? () => {} : undefined}
            >
                {(search?.length ?? 0) * (collab?.length ?? 0) > 0 && <div className="absolute top-full left-0 right-0 p-4 rounded bg-[#D8EDD9]/75 dark:bg-[#1B5E20]/75 text-[#1B5E20] dark:text-[#D8EDD9]">
                    {search?.map((u, index) => <button
                        key={index}
                        onClick={tree ? () => updateTree({ id: tree?.id, newCollaborators: [u.id] }).then(phTree => treeSocket?.emit({
                            type: TreeChange.TREE,
                            phTree
                        })) : undefined}
                        className={"w-full flex flex-row space-x-2 items-center rounded-full! dark:text-black/75 text-white/75 bg-[#1B5E20]/75! dark:bg-[#D8EDD9]/75! hover:bg-black/75! dark:hover:bg-white/75!"}>
                        {u.photo ? <img src={u.photo} className="rounded-full h-4! w-4! object-cover"/> : <i className="fas fa-user"/>}
                        <p>@{u.username}</p>
                    </button>)}
                </div>}
            </AuthField>
            <section>
                <p className="font-bold mb-2">Current Collaborators</p>
                {currentCollab?.map((c, index) => <div
                    key={index}
                    className="flex flex-row items-center justify-between p-6"
                >
                    <div className="flex flex-row items-center space-x-2">
                        {c.photo ? <img src={c.photo} className="rounded-full h-4! w-4! object-cover"/> : <i className="fas fa-user"/>}
                        <p>@{c.username}</p>
                    </div>
                    <i className="fas fa-times cursor-pointer hover:text-red-600" onClick={() => {
                        if(tree && tree?.userId === user?.id) updateTree({ id: tree.id, deleteCollaborators: [c.id] }).then(phTree => treeSocket?.emit({
                            type: TreeChange.TREE,
                            phTree
                        }));
                        else alert("Only the owner can delete collaborators");
                    }}/>
                </div>)}
            </section>
        </>
    )
};