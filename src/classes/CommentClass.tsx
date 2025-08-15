import type { CommentResponse } from "../types";

export class CommentClass {
    id: string;
    treeId: string;
    userId?: string;
    content?: string;
    createdAt: Date;
    updatedAt: Date;
    replies?: CommentClass[];
    parent?: CommentClass;
    constructor ({
        id,
        treeId,
        userId,
        content,
        createdAt,
        updatedAt,
        replies,
        parent
    }: CommentResponse & { parent?: CommentClass }) {
        this.id = id;
        this.treeId = treeId;
        this.userId = userId;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.parent = parent;
        this.replies = replies?.map(c => new CommentClass({
            parent: this,
            ...c
        }));
    }

    root = (): CommentClass => this.parent ? this.parent.root() : this;

    toJSON = (): CommentResponse => ({
        id: this.id,
        treeId: this.treeId,
        userId: this.userId,
        content: this.content,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        replies: this.replies?.map(r => r.toJSON())
    });

    allReplies = (): CommentClass[] => this.replies?.length ? [this, ...this.replies.flatMap(r => r.allReplies()) ?? []] : [this];

    removeReply = (id: string) => this.replies = this.replies?.filter(r => r.id !== id);
}