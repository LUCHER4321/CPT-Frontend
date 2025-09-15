import { getComment } from "../api/comment";
import { getTree } from "../api/phTree";
import { getMe, getUser } from "../api/user";
import { NotiFunc } from "../enums";
import type { NotificationResponse, NotificationString } from "../types";
import { nullableInput } from "./nullableInput";

export const notiToString = async ({ fun, authorId, treeId, commentId }: NotificationResponse):Promise<NotificationString> => {
    const author = (await getUser({ id: authorId }))?.username;
    const tree = await nullableInput(treeId, t => getTree({ id: t }));
    const comment = await nullableInput(treeId, t => nullableInput(commentId, c => getComment({ treeId: t, id: c })));
    switch(fun) {
        case NotiFunc.FOLLOW:
            return {
                author,
                color: ["bg-neutral-400 dark:bg-neutral-600", "text-neutral-700 dark:text-neutral-300"],
                icon: "fa-user-plus",
                title: `followed you`,
                url: `/profiles/${authorId}`
            };
        case NotiFunc.TREE:
            return {
                author,
                color: ["bg-teal-400 dark:bg-teal-600", "text-teal-700 dark:text-teal-300"],
                icon: "fa-project-diagram",
                title: `created a new tree`,
                body: tree?.name,
                url: `/trees/${treeId}`
            };
        case NotiFunc.COMMENT:
            return {
                author,
                color: ["bg-green-400 dark:bg-green-600", "text-green-700 dark:text-green-300"],
                icon: "fa-comment",
                title: `${[tree?.userId, ...tree?.collaborators ?? []].includes((await getMe({}))?.id) ? "commented on your tree" : "replied your comment"}`,
                body: comment?.content,
                url: `/trees/${treeId}`
            };
        case NotiFunc.LIKE:
            return {
                author,
                color: ["bg-red-400 dark:bg-red-600", "text-red-700 dark:text-red-300"],
                icon: "fa-heart",
                title: `liked your ${tree ? "tree" : "comment"}`,
                body: tree ? tree?.name : comment?.content,
                url: `/trees/${treeId}`
            };
        case NotiFunc.COLLABORATE:
            return {
                author,
                color: ["bg-amber-400 dark:bg-amber-600", "text-amber-600 dark:text-amber-300"],
                icon: "fa-users",
                title: `added you as collaborator to a tree`,
                body: tree?.name,
                url: `account/trees/${treeId}`
            };
    }
}