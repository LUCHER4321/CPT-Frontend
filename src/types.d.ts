import type { SpeciesJSON } from "chrono-phylo-tree";
import type { Liked, NotiFunc, Order, Plan, Role, TreeCriteria } from "./enums";
import type { StringValue } from "ms";

type RequestFunction<REQUEST, RESPONSE> = (request: REQUEST) => Promise<RESPONSE | undefined>;

type Email = `${string}@${string}.${string}`;

type ClassColor = {
    light: string;
    dark?: string;
}

export interface PlanPrice {
    name: string;
    color?: ClassColor;
    button?: ClassColor;
    border?: ClassColor;
    description: string;
    month: number;
    year: number;
    constraints: {
        maxTrees?: number;
        maxSpecies?: number;
        maxCollaborators?: number;
        extraConstraints?: string[];
    };
}

export interface UserResponse {
    id: string;
    email: Email;
    username: string;
    photo?: string;
    plan: Plan;
    role: Role;
    createdAt: Date;
    lastLogin: Date;
    isActive?: boolean;
    apiKeys?: string[];
    token?: string;
}

export interface UserRequest {
    register: RequestFunction<{
        email: Email;
        password: string;
        username: string;
    }, UserResponse>;
    login: RequestFunction<{
        email: Email;
        password: string;
    }, UserResponse>;
    search: RequestFunction<{
        search?: string;
        limit?: number;
    }, UserResponse[]>;
    getUser: RequestFunction<{
        id: string;
    }, UserResponse>;
    recover: RequestFunction<{
        email: Email;
        url: string;
    }, void>;
    resetPassword: RequestFunction<{
        token: string;
        password: string;
    }, UserResponse>;
    logout: RequestFunction<{}, void>;
    admin: RequestFunction<{
        adminId: string;
        removeAdmin?: boolean;
    }, UserResponse>;
    token: RequestFunction<{
        expiresIn?: number | StringValue;
    }, void>;
    getMe: RequestFunction<{}, UserResponse>;
    updateMe: RequestFunction<{
        username?: string;
        oldPassword?: string;
        password?: string;
        plan?: Plan;
    }, UserResponse>;
    deleteMe: RequestFunction<{}, void>;
    photoMe: RequestFunction<{
        image: File;
    }, UserResponse>;
    deletePhotoMe: RequestFunction<{}, UserResponse>;
    newApiKey: RequestFunction<{}, string>;
    deleteApiKey: RequestFunction<{
        keyToDelete: string;
    }, UserResponse>;
}

export interface FollowResponse {
    id: string;
    userId: string;
    followedUserId: string;
}

export interface FollowRequest {
    follow: RequestFunction<{
        id: string;
    }, FollowResponse>;
    unfollow: RequestFunction<{
        id: string;
    }, FollowResponse>;
    getFollowers: RequestFunction<{
        userId: string;
    }, UserResponse[]>;
    getFollowing: RequestFunction<{
        userId: string;
    }, UserResponse[]>;
    getFollowersCount: RequestFunction<{
        userId: string;
    }, { count: number }>;
}

export interface PhTreeResponse {
    id: string;
    userId: string;
    name: string;
    image?: string;
    description?: string;
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date;
    tags?: string[];
    collaborators?: string[];
    likes: number;
    comments: number;
    views: number;
}

type SearchProps = Partial<{
    page: number;
    limit: number;
    search: string;
    criteria: TreeCriteria;
    order: Order;
    from: Date;
    to: Date;
}>

export interface PhTreeRequest {
    createTree: RequestFunction<{
        name: string;
        description?: string;
        isPublic: boolean;
        tags?: string[];
        collaborators?: string[];
    }, PhTreeResponse>;
    getMyTrees: RequestFunction<SearchProps & { owner?: boolean }, PhTreeResponse[]>;
    myTreesCount: RequestFunction<{}, {
        total: number;
        myTrees: number;
        collabs: number;
    }>;
    updateTree: RequestFunction<{
        id: string;
        name?: string;
        description?: string;
        isPublic?: boolean;
        tags?: string[];
        newCollaborators?: string[];
        deleteCollaborators?: string[];
    }, PhTreeResponse>;
    deleteTree: RequestFunction<{
        id: string;
    }, void>;
    imageTree: RequestFunction<{
        id: string;
        image: File;
    }, PhTreeResponse>;
    deleteImageTree: RequestFunction<{
        id: string;
    }, PhTreeResponse>;
    searchTrees: RequestFunction<SearchProps, PhTreeResponse[]>;
    getTree: RequestFunction<{
        id: string;
    }, PhTreeResponse>;
    viewTree: RequestFunction<{
        id: string;
    }, { views: number }>;
}

export interface CommentResponse {
    id: string;
    treeId: string;
    userId: string;
    content?: string;
    createdAt: Date;
    updatedAt: Date;
    resplies?: CommentResponse[];
}

export interface CommentRequest {
    createComment: RequestFunction<{
        treeId: string;
        content: string;
        parentId?: string;
    }, CommentResponse>;
    updateComment: RequestFunction<{
        treeId: string;
        id: string;
        content?: string;
    }, CommentResponse>;
    deleteComment: RequestFunction<{
        treeId: string;
        id: string;
    }, void>;
    treeComments: RequestFunction<{
        treeId: string;
    }, CommentResponse[]>;
    getComment: RequestFunction<{
        treeId: string;
        id: string;
    }, CommentResponse>;
}

export interface LikeResponse {
    id: string;
    userId: string;
    treeId?: string;
    commentId?: string;
    createdAt: Date;
}

export interface LikeRequest {
    like: RequestFunction<{
        liked: Liked;
        id: string;
    }, LikeResponse>;
    unlike: RequestFunction<{
        liked: Liked;
        id: string;
    }, void>;
    likedTrees: RequestFunction<{}, PhTreeResponse[]>;
    likedComments: RequestFunction<{}, CommentResponse[]>;
    getLikes: RequestFunction<{
        liked: Liked;
        id: string;
    }, {
        likesCount: number;
        myLike?: boolean;
    }>;
}

export interface SpeciesResponse extends Omit<SpeciesJSON, "descendants"> {
    treeId: string;
    ancestorId?: string;
    descendants?: SpeciesResponse[];
}

export interface SpeciesRequest {
    createSpecies: RequestFunction<{
        treeId: string;
        ancestorId?: string;
    } & Omit<SpeciesJSON, "image">, SpeciesResponse>;
    updateSpecies: RequestFunction<{
        treeId: string;
        id: string;
        ancestorId?: string | null;
    } & Partial<Omit<SpeciesJSON, "image">>, SpeciesResponse>;
    deleteSpecies: RequestFunction<{
        treeId: string;
        id: string;
    }, void>;
    speciesImage: RequestFunction<{
        treeId: string;
        id: string;
        image: File;
    }, SpeciesResponse>;
    deleteSpeciesImage: RequestFunction<{
        treeId: string;
        id: string;
    }, SpeciesResponse>;
    treeSpecies: RequestFunction<{
        treeId: string;
    }, SpeciesResponse[]>;
    getSpecies: RequestFunction<{
        treeId: string;
        id: string;
    }, SpeciesResponse>;
}

export interface NotificationResponse {
    id: string;
    fun: NotiFunc;
    usersId: string[];
    imputs: string[];
    authorId: string;
    seen: boolean;
    createdAt: Date;
}

export interface NotificationRequest {
    getNotifications: RequestFunction<Partial<{
        from: Date;
        to: Date;
        limit: number;
    }>, NotificationResponse[]>;
    seeNotification: RequestFunction<{
        id: string;
    }, NotificationResponse>;
}