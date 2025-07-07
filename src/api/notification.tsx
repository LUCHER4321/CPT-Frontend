import type { NotificationRequest } from "../types";
import { fetchConfig } from "../utils/forAPI";

const notification = "notification";

const notificationRequest: NotificationRequest = {
    getNotifications: async (queries) => await fetchConfig({
        route: [notification],
        queries
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