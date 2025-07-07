import type { SpeciesRequest } from "../types";
import { fetchConfig, fetchImage } from "../utils/forAPI";

const species = (treeId: string, ...r: string[]) => ["species", treeId, ...r];

const speciesRequest: SpeciesRequest = {
    createSpecies: async ({ treeId, ...body }) => await fetchConfig({
        method: "POST",
        route: species(treeId),
        body
    }),
    updateSpecies: async ({ treeId, id, ...body }) => await fetchConfig({
        method: "PATCH",
        route: species(treeId, id),
        body
    }),
    deleteSpecies: async ({ treeId, id }) => await fetchConfig({
        method: "DELETE",
        route: species(treeId, id)
    }),
    speciesImage: async ({ treeId, id, image }) => await fetchImage({
        route: species(treeId, id, "image"),
        image
    }),
    deleteSpeciesImage: async ({ treeId, id }) => await fetchConfig({
        method: "DELETE",
        route: species(treeId, id, "image")
    }),
    treeSpecies: async ({ treeId }) => await fetchConfig({
        route: species(treeId)
    }),
    getSpecies: async ({ treeId, id }) => await fetchConfig({
        route: species(treeId, id)
    })
}

export const {
    createSpecies,
    updateSpecies,
    deleteSpecies,
    speciesImage,
    deleteSpeciesImage,
    treeSpecies,
    getSpecies
} = speciesRequest;