import { io } from "socket.io-client";
import type { NotificationRequest, NotificationResponse } from "../types";
import { fetchConfig } from "../utils/forAPI";
import { WS_URL } from "../config";
import type { NotiFunc } from "../enums";

const notification = "notification";

export const notificationRequest: NotificationRequest = {
    getNotifications: async (queries) => await fetchConfig({
        route: [notification],
        queries
    }),
    seeNotification: async ({ id }) => await fetchConfig({
        method: "PATCH",
        route: [notification, id]
    })
}

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