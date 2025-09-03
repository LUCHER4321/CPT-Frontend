import { useState } from "react";
import { photoClass } from "../../data/classNames";
import { NotiFunc } from "../../enums";
import type { CommentResponse, UserResponse } from "../../types"
import { AuthField } from "../auth/AuthField";
import { createComment, deleteComment, updateComment } from "../../api/comment";
import { notificationService } from "../../classes/NotificationService";

interface CommentProps {
    comment?: CommentResponse;
    user?: UserResponse;
    cUser?: UserResponse;
    likes?: number;
    liked?: boolean;
    setLiked?: (b: boolean) => void;
    editing?: boolean;
    setEditing?: (b: boolean) => void;
    edit?: (c?: string) => void;
    reply?: (r?: CommentResponse & { parentId?: string }) => void;
    delComment?: (c?: CommentResponse) => void;
    children?: any;
}

export const Comment = ({
    comment,
    user,
    cUser,
    likes,
    liked,
    setLiked,
    reply,
    edit,
    delComment,
    children
}: CommentProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const [editValue, setEditValue] = useState(comment?.content);
    const [replyValue, setReplyValue] = useState("");
    return (
        <div className="py-2 pl-2">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row space-x-2 items-center">
                    {user?.photo ? <img src={user?.photo} className={photoClass} alt="Profile"/> : <i className={photoClass + " fas fa-user dark:text-[#D8EDD9] text-[#1B5E20] text-center text-4xl"}/>}
                    <p className="font-bold">{user?.username ?? "[deleted]"}</p>
                    {cUser?.id === user?.id && <>
                        <i className="fas fa-pen cursor-pointer" onClick={() => {
                            if(isEditing) edit?.(editValue);
                            setIsEditing(!isEditing);
                        }}/>
                        <i className="fas fa-trash cursor-pointer" onClick={() => {
                            if(confirm("Are you sure you wanna delete this comment?")) deleteComment({
                                treeId: comment?.treeId ?? "",
                                id: comment?.id ?? ""
                            }).then(() => delComment?.(comment));
                        }}/>
                    </>}
                </div>
                {comment?.content && <div className="flex flex-row space-x-2 items-center">
                    <i
                        className={"fas fa-heart cursor-pointer " + (liked ? "text-red-500" : "")}
                        onClick={() => {
                            setLiked?.(!liked);
                            notificationService.emit({
                                fun: NotiFunc.LIKE,
                                commentId: comment?.id
                            })
                        }}
                    />
                    <p>{likes}</p>
                    <i
                        className="fas fa-reply cursor-pointer"
                        onClick={() => setIsReplying(!isReplying)}
                    />
                </div>}
            </div>
            {isEditing ? <AuthField
                textArea
                value={editValue}
                setValue={setEditValue}
                placeholder="Edit comment..."
                onBlur={() => {
                    if(comment && editValue !== comment.content) updateComment({
                        treeId: comment.treeId,
                        id: comment.id,
                        content: editValue
                    });
                }}
            /> : <p>{comment?.content ?? "[deleted]"}</p>}
            {isReplying && <AuthField
                textArea
                value={replyValue}
                setValue={setReplyValue}
                placeholder="Reply comment..."
                setIcon
                icon="fa-plus"
                onClick={() => createComment({
                    treeId: comment?.treeId ?? "",
                    parentId: comment?.id,
                    content: replyValue
                }).then(r => {
                    if(r) reply?.({
                        parentId: comment?.id,
                        ...r
                    });
                    setIsReplying(false);
                })}
            />}
            {children && <div className="py-2 pl-2 border-l">{children}</div>}
        </div>
    )
}