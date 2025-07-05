import { Liked } from "../enums";
import type { LikeRequest } from "../types";
import { fetchConfig } from "../utils/forAPI";

const like = (liked: Liked, ...r: string[]) => ["like", liked, ...r];

export const likeRequest: LikeRequest = {
    like: async ({ liked, id }) => await fetchConfig({
        method: "POST",
        route: like(liked, id)
    }),
    unlike: async ({ liked, id }) => await fetchConfig({
        method: "DELETE",
        route: like(liked, id)
    }),
    likedTrees: async () => await fetchConfig({
        route: like(Liked.TREE, "liked")
    }),
    likedComments: async () => await fetchConfig({
        route: like(Liked.COMMENT, "liked")
    }),
    getLikes: async ({ liked, id }) => await fetchConfig({
        route: like(liked, id)
    })
}