import type { FollowRequest } from "../types";
import { fetchConfig } from "../utils/forAPI";

const follow = "follow";

export const followRequest: FollowRequest = {
    follow: async ({ id }) => await fetchConfig({
        method: "POST",
        route: [follow, id]
    }),
    unfollow: async ({ id }) => await fetchConfig({
        method: "DELETE",
        route: [follow, id]
    }),
    getFollowers: async ({ userId }) => await fetchConfig({
        route: [follow, "followers", userId]
    }),
    getFollowing: async ({ userId }) => await fetchConfig({
        route: [follow, "following", userId]
    }),
    getFollowersCount: async ({ userId }) => await fetchConfig({
        route: [follow, "count", userId]
    })
}