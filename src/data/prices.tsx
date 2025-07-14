import { Plan } from "../enums"
import type { PlanPrice } from "../types"

const free: PlanPrice = {
    name: "Free",
    description: "Ideal for starting to explore phylogenetics",
    month: 0,
    year: 0,
    constraints: {
        maxTrees: 5,
        maxSpecies: 30
    }
}

const pro: PlanPrice = {
    name: "Pro",
    description: "For researchers and educators",
    color: {
        light: "text-[#2196F3]!",
        dark: "dark:text-blue-600!"
    },
    button: {
        light: "bg-[#2196F3]!",
        dark: "dark:bg-blue-600!"
    },
    month: 9,
    year: 86.4,
    constraints: {
        maxTrees: 20,
        maxSpecies: 150,
        maxCollaborators: 10
    }
}

const premium: PlanPrice = {
    name: "Premium",
    description: "For institutions and research teams",
    color: {
        light: "text-fuchsia-300!",
        dark: "dark:text-fuchsia-700!"
    },
    button: {
        light: "bg-fuchsia-300!",
        dark: "dark:bg-fuchsia-700!"
    },
    month: 19,
    year: 182.4,
    constraints: {
        maxCollaborators: 30
    }
}

const institutional: PlanPrice = {
    name: "Institutional",
    description: "For institutions that need premium access for all their members",
    month: 499,
    year: 4788,
    constraints: {
        maxCollaborators: 30,
        extraConstraints: [
            "Premium accounts for all institiution members",
            "Personalized domain (@your_institution.com)",
            "SSO (Single Sign-On)"
        ]
    }
}

export const plans = new Map([
    [Plan.FREE, free],
    [Plan.PRO, pro],
    [Plan.PREMIUM, premium],
    [Plan.INSTITUTIONAL, institutional]
]);