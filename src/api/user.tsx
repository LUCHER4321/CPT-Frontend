import { Plan, Role } from "../enums";
import type { UserRequest, UserResponse } from "../types";
import { fetchConfig, fetchImage } from "../utils/forAPI";
import { checkSubscription, pauseSubscriptions } from "./payPal";

const user = "user";
const userMe = ["user", "me"];

const userRequest: UserRequest = {
    register: async (body) => await fetchConfig({
        method: "POST",
        body,
        route: [user, "register"],
        containsError: true
    }),
    login: async (body) => await fetchConfig({
        method: "POST",
        body,
        route: [user, "login"],
        containsError: true
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
        route: [user, "recover"],
        containsError: true
    }),
    resetPassword: async ({token, ...body}) => await fetchConfig({
        method: "POST",
        body,
        route: [user, "reset", token],
        containsError: true
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
    getMe: async () => {
        const user: UserResponse | undefined = await fetchConfig({
            route: userMe
        });
        if(user?.role === Role.USER && user.plan !== Plan.FREE) {
            if(!await checkSubscription(user.subId)) await pauseSubscriptions(user.subId).then(({ completed }) => completed ? updateMe({
                plan: Plan.FREE,
                billing: null,
                subId: null
            }) : undefined);
            return await getMe({});
        }
        return user;
    },
    updateMe: async (body) => await fetchConfig({
        method: "PATCH",
        body,
        route: userMe,
        containsError: true
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
    search: userSearch,
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