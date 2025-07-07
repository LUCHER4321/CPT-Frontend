import { Liked } from "../enums";
import type { LikeRequest } from "../types";
import { fetchConfig } from "../utils/forAPI";

const likeUrl = (liked: Liked, ...r: string[]) => ["like", liked, ...r];

const likeRequest: LikeRequest = {
    like: async ({ liked, id }) => await fetchConfig({
        method: "POST",
        route: likeUrl(liked, id)
    }),
    unlike: async ({ liked, id }) => await fetchConfig({
        method: "DELETE",
        route: likeUrl(liked, id)
    }),
    likedTrees: async () => await fetchConfig({
        route: likeUrl(Liked.TREE, "liked")
    }),
    likedComments: async () => await fetchConfig({
        route: likeUrl(Liked.COMMENT, "liked")
    }),
    getLikes: async ({ liked, id }) => await fetchConfig({
        route: likeUrl(liked, id)
    })
}

export const {
    like,
    unlike,
    likedTrees,
    likedComments,
    getLikes
} = likeRequest;