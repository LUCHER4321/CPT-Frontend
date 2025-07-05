import type { SpeciesJSON } from "chrono-phylo-tree";
import type { Liked, NotiFunc, Order, Plan, Role, TreeCriteria } from "./enums";

type RequestFunction<REQUEST, RESPONSE> = (request: REQUEST) => Promise<RESPONSE | undefined>;

export interface UserResponse {
    id: string;
    email: string;
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
        email: string;
        password: string;
        username: string;
    }, UserResponse>;
    login: RequestFunction<{
        email: string;
        password: string;
    }, UserResponse>;
    search: RequestFunction<{
        search?: string;
        limit?: number;
    }, UserResponse[]>;
    getUser: RequestFunction<{
        id: string;
    }, UserResponse>;
    logout: RequestFunction<{}, void>;
    admin: RequestFunction<{
        adminId: string;
        removeAdmin?: boolean;
    }, UserResponse>;
    token: RequestFunction<{
        expiresIn?: number | string;
    }, string>;
    getMe: RequestFunction<{}, UserResponse>;
    updateMe: RequestFunction<{
        username?: string;
        oldPassword?: string;
        password?: string;
        plan?: string;
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
    }, number>;
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

interface SearchProps{
    page?: number;
    limit?: number;
    search?: string;
    criteria?: TreeCriteria;
    order?: Order;
    from?: Date;
    to?: Date;
}

export interface PhTreeRequest {
    createTree: RequestFunction<{
        name: string;
        description?: string;
        isPublic: boolean;
        tags?: string[];
        collaborators?: string[];
    }, PhTreeResponse>;
    myTrees: RequestFunction<SearchProps, PhTreeResponse[]>;
    updateTree: RequestFunction<{
        id: string;
        name?: string;
        description?: string;
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
    }, number>;
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
    id: string;
    treeId: string;
    ancestorId?: string;
    descendants?: SpeciesResponse[];
}

export interface SpeciesRequest {
    createSpecies: RequestFunction<{
        treeId: string;
        ancestorId?: string;
    } & SpeciesJSON, SpeciesResponse>;
    updateSpecies: RequestFunction<{
        treeId: string;
        id: string;
        ancestorId?: string | null;
    } & Partial<SpeciesJSON>, SpeciesResponse>;
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
    getNotifications: RequestFunction<{
        from?: string;
        to?: string;
        limit?: string;
    }, NotificationResponse[]>;
    seeNotification: RequestFunction<{
        id: string;
    }, NotificationResponse>;
    setNotification: RequestFunction<{
        fun: NotiFunc;
        followedUserId?: string;
        treeId?: string;
        commentId?: string;
    }, NotificationResponse>;
    recieveNotification: RequestFunction<{}, NotificationResponse>;
}