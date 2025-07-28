import { Plan, Role } from "../enums";
import type { PhTreeResponse, UserResponse } from "../types";

export const exampleTrees: PhTreeResponse[] = [
    {
        id: "0",
        userId: "0",
        name: "Mammals",
        description: "A representation of the Evolution of the Mammals",
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
    },
    {
        id: "3",
        userId: "0",
        name: "Apes",
        description: "The phylogenetic relationship between the apes",
        isPublic: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        likes: 0,
        comments: 0,
        views: 0
    },
    {
        id: "4",
        userId: "0",
        name: "Pigs",
        isPublic: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        likes: 0,
        comments: 0,
        views: 0
    },
];

export const exampleUsers: UserResponse[] = [
    {
        id: "0",
        email: "biologist_user@gmail.com",
        username: "biologist_user",
        plan: Plan.PREMIUM,
        role: Role.USER,
        createdAt: new Date(),
        lastLogin: new Date(),
    },
    {
        id: "1",
        email: "ornithologist@gmail.com",
        username: "ornithologist",
        plan: Plan.PREMIUM,
        role: Role.USER,
        createdAt: new Date(),
        lastLogin: new Date(),
    },
    {
        id: "2",
        email: "botany@gmail.com",
        username: "botany",
        plan: Plan.PREMIUM,
        role: Role.USER,
        createdAt: new Date(),
        lastLogin: new Date(),
    },
]