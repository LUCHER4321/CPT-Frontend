import type { TreeChange } from "../enums";
import type { PhTreeResponse, SpeciesResponse } from "../types";
import { socket } from "../api/socket";

type PhTreeChange = Omit<
    Omit<
        Omit<
            Omit<
                Omit<
                    PhTreeResponse, "createdAt"
                >, "updatedAt"
            >, "likes"
        >, "comments"
    >, "views"
>;

interface PhTreeEmit {
    type?: TreeChange;
    species?: SpeciesResponse;
    phTree?: PhTreeChange;
}

interface PhTreeWSProps {
    response: (ph: PhTreeEmit) => void;
    treeId: string;
}

export class PhTreeWS {

    constructor ({
        response,
        treeId
    }: PhTreeWSProps) {
        socket.on("set-tree-server-" + treeId, response);
    }

    emit = (data: PhTreeEmit) => socket.emit("set-tree-client", data);
}