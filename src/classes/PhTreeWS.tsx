import type { TreeChange } from "../enums";
import type { Socket } from "socket.io-client";
import type { PhTreeResponse, SpeciesResponse } from "../types";

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
    socket: Socket;
    response: (ph: PhTreeEmit) => void;
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