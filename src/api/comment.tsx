import type { CommentRequest } from "../types";
import { fetchConfig } from "../utils/forAPI";

const comment = (treeId: string, ...r: string[]) => ["comment", treeId, ...r];

export const commentRequest: CommentRequest = {
    createComment: async ({ treeId, ...body }) => await fetchConfig({
        method: "POST",
        route: comment(treeId),
        body
    }),
    updateComment: async ({ treeId, id, ...body }) => await fetchConfig({
        method: "PATCH",
        route: comment(treeId, id),
        body
    }),
    deleteComment: async ({ treeId, id }) => await fetchConfig({
        method: "DELETE",
        route: comment(treeId, id)
    }),
    treeComments: async ({ treeId }) => await fetchConfig({
        route: comment(treeId)
    }),
    getComment: async ({ treeId, id }) => await fetchConfig({
        route: comment(treeId, id)
    })
}