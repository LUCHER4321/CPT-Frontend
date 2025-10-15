import type { ContactRequest } from "../types";
import { fetchConfig } from "../utils/forAPI";

const contactRequest: ContactRequest = {
    contact: async (body) => await fetchConfig({
        method: "POST",
        route: ["contact"],
        body
    })
};

export const {
    contact
} = contactRequest;