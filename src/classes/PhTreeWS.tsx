import type { SpeciesJSON } from "chrono-phylo-tree";
import type { TreeChange } from "../enums";
import type { Socket } from "socket.io-client";

interface SpeciesMongo extends Omit<SpeciesJSON, "descendants"> {
    id: string;
    treeId: string;
    descendants?: SpeciesMongo[];
}

interface PhTreeChange {
    id: string;
    userId: string;
    name: string;
    image?: string;
    description?: string;
    isPublic: boolean;
    tags?: string[];
    collaborators?: string[];
}

type DataProps = (SpeciesMongo | PhTreeChange) & {change: TreeChange};

interface PhTreeEmit {
    type?: TreeChange;
    species?: SpeciesMongo;
    phTree?: PhTreeChange;
}

interface PhTreeWSProps {
    socket: Socket;
    response: (ph: DataProps) => void;
    treeId: string;
}

export class PhTreeWS {
    socket: Socket;

    constructor ({
        socket,
        response,
        treeId
    }: PhTreeWSProps) {
        this.socket = socket;
        this.socket.on("set-tree-server-" + treeId, response);
    }

    emit = (data: PhTreeEmit) => this.socket.emit("set-tree-client", data);
}