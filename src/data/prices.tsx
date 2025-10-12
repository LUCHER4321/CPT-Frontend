import { INSTI_M, INSTI_Y, PREMIUM_M, PREMIUM_Y, PRO_M, PRO_Y } from "../config"
import { Billing, Plan } from "../enums"
import type { PlanPrice } from "../types"

const free: PlanPrice = {
    name: "Free",
    description: "Ideal for starting to explore phylogenetics",
    month: 0,
    year: 0,
    border: {
        light: "border-t-[#BDBDBD]",
        dark: "dark:border-t-neutral-600"
    },
    constraints: {
        maxTrees: 5,
        maxSpecies: 30
    }
}

const pro: PlanPrice = {
    name: "Pro",
    id: new Map([
        [Billing.MONTHLY, PRO_M],
        [Billing.ANNUAL, PRO_Y],
    ]),
    description: "For researchers and educators",
    color: {
        light: "text-[#2196F3]!",
        dark: "dark:text-blue-600!"
    },
    button: {
        light: "bg-[#2196F3]!",
        dark: "dark:bg-blue-600!"
    },
    border: {
        light: "border-t-[#2196F3]",
        dark: "dark:border-t-blue-600"
    },
    borderFull: {
        light: "outline-[#2196F3]",
        dark: "dark:outline-blue-600"
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
    id: new Map([
        [Billing.MONTHLY, PREMIUM_M],
        [Billing.ANNUAL, PREMIUM_Y],
    ]),
    description: "For institutions and research teams",
    color: {
        light: "text-fuchsia-300!",
        dark: "dark:text-fuchsia-700!"
    },
    button: {
        light: "bg-fuchsia-300!",
        dark: "dark:bg-fuchsia-700!"
    },
    border: {
        light: "border-t-fuchsia-300",
        dark: "dark:border-t-fuchsia-700"
    },
    borderFull: {
        light: "outline-fuchsia-300",
        dark: "dark:outline-fuchsia-700"
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
    id: new Map([
        [Billing.MONTHLY, INSTI_M],
        [Billing.ANNUAL, INSTI_Y],
    ]),
    month: 499,
    year: 4788,
    color: {
        light: "text-orange-600!",
    },
    button: {
        light: "bg-orange-600!",
        dark: "dark:bg-orange-400"
    },
    border: {
        light: "border-t-orange-600",
        dark: "dark:border-t-orange-400"
    },
    borderFull: {
        light: "outline-orange-600",
        dark: "dark:outline-orange-400"
    },
    constraints: {
        maxCollaborators: 30,
        extraConstraints: [
            "Premium accounts for all institiution members",
            "Personalized domain (@your_institution.com)",
            //"SSO (Single Sign-On)"
        ]
    }
}

export const plans = new Map([
    [Plan.FREE, free],
    [Plan.PRO, pro],
    [Plan.PREMIUM, premium],
    [Plan.INSTITUTIONAL, institutional]
]);