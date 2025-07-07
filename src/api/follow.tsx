import type { FollowRequest } from "../types";
import { fetchConfig } from "../utils/forAPI";

const followUrl = "follow";

const followRequest: FollowRequest = {
    follow: async ({ id }) => await fetchConfig({
        method: "POST",
        route: [followUrl, id]
    }),
    unfollow: async ({ id }) => await fetchConfig({
        method: "DELETE",
        route: [followUrl, id]
    }),
    getFollowers: async ({ userId }) => await fetchConfig({
        route: [followUrl, "followers", userId]
    }),
    getFollowing: async ({ userId }) => await fetchConfig({
        route: [followUrl, "following", userId]
    }),
    getFollowersCount: async ({ userId }) => await fetchConfig({
        route: [followUrl, "count", userId]
    })
}

export const {
    follow,
    unfollow,
    getFollowers,
    getFollowing,
    getFollowersCount
} = followRequest;