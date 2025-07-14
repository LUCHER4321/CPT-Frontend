import { Socket } from "socket.io-client";
import type { NotiFunc } from "../enums";
import type { NotificationResponse } from "../types";

interface NotificationEmit {
    fun: NotiFunc;
    userId?: string;
    treeId?: string;
    commentId?: string;
}

interface NotificationWSProps {
    socket: Socket;
    response: (nr: NotificationResponse) => void;
    userId: string;
}

export class NotificationWS {
    socket: Socket;

    constructor ({
        socket,
        response,
        userId
    }: NotificationWSProps) {
        this.socket = socket;
        this.socket.on("set-notification-server-" + userId, response);
    }

    emit = (data: NotificationEmit) => this.socket.emit("set-notification-client", data);
}