import { io } from "socket.io-client";
import type { NotiFunc } from "../enums";
import { WS_URL } from "../config";
import type { NotificationResponse } from "../types";

interface NotificationEmit {
    fun: NotiFunc;
    userId?: string;
    treeId?: string;
    commentId?: string;
}

export class NotificationWS {
    socket = io(WS_URL);

    constructor (response: (nr: NotificationResponse) => void) {
        const { on } = this.socket;
        on("set-notification-server", response);
    }

    emit = (data: NotificationEmit) => this.socket.emit("set-notification-client", data);
}