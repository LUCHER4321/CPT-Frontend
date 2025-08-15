export enum Billing {
    MONTHLY = "monthly",
    ANNUAL = "annual"
}

export enum Liked {
    TREE = "ph-tree",
    COMMENT = "comment"
}

export enum NotiFunc {
    FOLLOW = "follow",
    TREE = "tree",
    COMMENT = "comment",
    LIKE = "like",
    COLLABORATE = "collaborate"
}

export enum Role {
    ADMIN = "admin",
    USER = "user",
    BOSS = "boss"
}

export enum Plan {
    FREE = "free",
    PRO = "pro",
    PREMIUM = "premium",
    INSTITUTIONAL = "institutional"
}

export enum TreeCriteria {
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",
    LIKES = "likes",
    COMMENTS = "comments",
    VIEWS = "views",
    NAME = "name",
    POPULARITY = "popularity"
}

export enum TreeChange {
    NEW = "new",
    EDIT = "edit",
    DELETE = "delete",
    TREE = "tree"
}

export enum Order {
    ASC = "asc",
    DESC = "desc"
}

export enum TreeProp {
    TREE = "tree",
    NODE = "node",
    COLLABORATORS = "collaborators",
    COMMENTS = "comments"
}

export enum TimeUnit {
    Y = 1,
    KY = 1e3,
    MY = 1e6,
    BY = 1e9,
    TY = 1e12
}