import { Plan, Role } from "../enums";
import type { PhTreeResponse, UserResponse } from "../types";

export const exampleTrees: PhTreeResponse[] = [
    {
        id: "0",
        userId: "0",
        name: "Mammals",
        isPublic: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        likes: 124,
        comments: 23,
        views: 500
    },
    {
        id: "1",
        userId: "1",
        name: "Birds",
        isPublic: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        likes: 89,
        comments: 12,
        views: 400
    },
    {
        id: "2",
        userId: "2",
        name: "Plants",
        isPublic: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        likes: 56,
        comments: 7,
        views: 300
    }
];

export const exampleUsers: UserResponse[] = [
    {
        id: "0",
        email: "a@a.c",
        username: "biologist_user",
        plan: Plan.PREMIUM,
        role: Role.USER,
        createdAt: new Date(),
        lastLogin: new Date(),
    },
    {
        id: "1",
        email: "a@a.c",
        username: "ornithologist",
        plan: Plan.PREMIUM,
        role: Role.USER,
        createdAt: new Date(),
        lastLogin: new Date(),
    },
    {
        id: "2",
        email: "a@a.c",
        username: "botany",
        plan: Plan.PREMIUM,
        role: Role.USER,
        createdAt: new Date(),
        lastLogin: new Date(),
    },
]