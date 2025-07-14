import type { UserRequest } from "../types";
import { fetchConfig, fetchImage } from "../utils/forAPI";

const user = "user";
const userMe = ["user", "me"];

const userRequest: UserRequest = {
    register: async (body) => await fetchConfig({
        method: "POST",
        body,
        route: [user, "register"]
    }),
    login: async (body) => await fetchConfig({
        method: "POST",
        body,
        route: [user, "login"]
    }),
    search: async (queries) => await fetchConfig({
        route: [user, "search"],
        queries
    }),
    getUser: async ({ id }) => await fetchConfig({
        route: [user, id]
    }),
    recover: async (body) => await fetchConfig({
        method: "POST",
        body,
        route: [user, "recover"]
    }),
    resetPassword: async ({token, ...body}) => await fetchConfig({
        method: "POST",
        body,
        route: [user, "reser", token]
    }),
    logout: async (body) => await fetchConfig({
        method: "POST",
        body,
        route: [user, "logout"]
    }),
    admin: async (body) => await fetchConfig({
        method: "POST",
        body,
        route: [user, "admin"]
    }),
    token: async (body) => await fetchConfig({
        method: "POST",
        body,
        route: [user, "token"]
    }),
    getMe: async () => await fetchConfig({
        route: userMe
    }),
    updateMe: async (body) => await fetchConfig({
        method: "PATCH",
        body,
        route: userMe
    }),
    deleteMe: async () => await fetchConfig({
        method: "DELETE",
        route: userMe
    }),
    photoMe: async ({ image }) => await fetchImage({
        route: [...userMe, "photo"],
        image
    }),
    deletePhotoMe: async () => await fetchConfig({
        method: "DELETE",
        route: [...userMe, "photo"]
    }),
    newApiKey: async () => await fetchConfig({
        method: "POST",
        route: [...userMe, "key"]
    }),
    deleteApiKey: async ({ keyToDelete }) => await fetchConfig({
        method: "DELETE",
        route: [...userMe, "key", keyToDelete]
    })
};

export const {
    register,
    login,
    search,
    getUser,
    recover,
    resetPassword,
    logout,
    admin,
    token,
    getMe,
    updateMe,
    deleteMe,
    photoMe,
    deletePhotoMe,
    newApiKey,
    deleteApiKey
} = userRequest;