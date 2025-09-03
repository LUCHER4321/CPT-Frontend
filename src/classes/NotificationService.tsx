import type { NotificationResponse } from "../types";
import { NotificationWS, type NotificationEmit, type NotificationWSProps } from "./NotificationWS";

class NotificationService {
    private static instance: NotificationService;
    private notificationWS?: NotificationWS;
    private listeners: Array<(nr: NotificationResponse) => void> = [];

    static getInstance = (): NotificationService => {
        if(!NotificationService.instance) NotificationService.instance = new NotificationService();
        return NotificationService.instance;
    }

    initialize = ({
        response,
        userId
    }: NotificationWSProps) => {
        if(!this.notificationWS) this.notificationWS = new NotificationWS({
            response: this.broadcastToListeners.bind(this),
            userId: userId
        });
        this.addListener(response);
    }

    private broadcastToListeners = (nr: NotificationResponse) => this.listeners.forEach(listener => listener(nr));

    addListener = (listener: (nr: NotificationResponse) => void) => this.listeners.push(listener);

    removeListener = (listener: (nr: NotificationResponse) => void) => this.listeners = this.listeners.filter(l => l !== listener);

    emit = (data: NotificationEmit) => {
        if(this.notificationWS) this.notificationWS.emit(data);
    }
}

export const notificationService = NotificationService.getInstance();