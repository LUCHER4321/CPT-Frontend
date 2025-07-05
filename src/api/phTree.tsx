import type { PhTreeRequest } from "../types";
import { fetchConfig, fetchImage } from "../utils/forAPI";

const phTree = "ph-tree"

export const phTreeRequest: PhTreeRequest = {
    createTree: async (body) => await fetchConfig({
        method: "POST",
        route: [phTree],
        body
    }),
    myTrees: async (queries) => await fetchConfig({
        route: [phTree, "me"],
        queries
    }),
    updateTree: async ({ id, ...body }) => await fetchConfig({
        route: [phTree, id],
        body
    }),
    deleteTree: async ({ id }) => await fetchConfig({
        method: "DELETE",
        route: [phTree, id]
    }),
    imageTree: async ({ id, image }) => await fetchImage({
        route: [phTree, id],
        image
    }),
    deleteImageTree: async ({ id }) => await fetchConfig({
        method: "DELETE",
        route: [phTree, id]
    }),
    searchTrees: async (queries) => await fetchConfig({
        route: [phTree],
        queries
    }),
    getTree: async ({ id }) => await fetchConfig({
        route: [phTree, id]
    }),
    viewTree: async ({ id }) => await fetchConfig({
        route: [phTree, id, "view"]
    })
}