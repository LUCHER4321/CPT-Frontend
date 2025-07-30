import type { NotificationRequest } from "../types";
import { fetchConfig } from "../utils/forAPI";

const notification = "notification";

const notificationRequest: NotificationRequest = {
    getNotifications: async ({ from, to, ...q }) => await fetchConfig({
        route: [notification],
        queries: {
            ...from ? { from: from.toISOString() } : {},
            ...to ? { to: to.toISOString() } : {},
            ...q
        }
    }),
    seeNotification: async ({ id }) => await fetchConfig({
        method: "PATCH",
        route: [notification, id]
    })
}

export const {
    getNotifications,
    seeNotification
} = notificationRequest;