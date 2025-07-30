import type { SpeciesJSON } from "chrono-phylo-tree";
import type { TreeChange } from "../enums";
import type { Socket } from "socket.io-client";
import type { PhTreeResponse } from "../types";

interface SpeciesMongo extends Omit<SpeciesJSON, "descendants"> {
    treeId: string;
    descendants?: SpeciesMongo[];
}

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

type DataProps = {
    change: TreeChange;
    species?: SpeciesMongo;
    phTree?: PhTreeChange;
};

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