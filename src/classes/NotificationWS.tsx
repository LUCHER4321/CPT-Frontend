import type { NotiFunc } from "../enums";
import type { NotificationResponse } from "../types";
import { socket } from "../api/socket";

export interface NotificationEmit {
    fun: NotiFunc;
    userId?: string;
    treeId?: string;
    commentId?: string;
}

export interface NotificationWSProps {
    response: (nr: NotificationResponse) => void;
    userId: string;
}

export class NotificationWS {
    isConnected = false;

    constructor ({
        response,
        userId
    }: NotificationWSProps) {
        this.setupListeners(response, userId);
        socket.on("connect", () => {
            this.isConnected = true;
            console.log("Socket connected");
            this.setupListeners(response, userId);
        });
        socket.on("disconnect", () => {
            this.isConnected = false;
            console.log("Socket disconnected");
        });
    }

    emit = (data: NotificationEmit) => {
        socket.emit("set-notification-client", data);
        console.log({ data })
    }

    private setupListeners = (response: (nr: NotificationResponse) => void, userId: string) => {
        //socket.off("set-notification-server");
        socket.on("set-notification-server", (nr: NotificationResponse) => {
            if (nr.usersId.includes(userId)) response(nr);
        });
        socket.on("error", (error) => {
            console.error("Notification error:", error);
        });
    }
}