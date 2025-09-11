import { memo, useEffect, useState, type ReactElement } from "react";
import { createComment } from "../../api/comment";
import { getUser } from "../../api/user";
import type { CommentResponse, PhTreeResponse, UserResponse } from "../../types";
import { AuthField } from "../auth/AuthField";
import { Comment } from "./Comment";
import { getLikes, like, unlike } from "../../api/like";
import { Liked, NotiFunc } from "../../enums";
import { CommentClass } from "../../classes/CommentClass";
import { notificationService } from "../../classes/NotificationService";

interface CommentViewPropsProps{
    tree?: PhTreeResponse;
    user?: UserResponse;
    setTree?: (t: PhTreeResponse) => void;
    comment?: string;
    setComment?: (s: string) => void;
    comments?: CommentResponse[];
    setComments?: (s?: CommentResponse[]) => void;
}

interface CommentAndRepliesProps {
    comment?: CommentResponse;
}

const getAllReplies = (comment: CommentResponse, parentId?: string): (CommentResponse & { parentId?: string })[] => [{
    parentId,
    ...comment
}, ...comment.replies?.flatMap(r => getAllReplies(r, comment.id)) ?? []];

export const CommentViewProps = ({
    tree,
    user,
    setTree,
    comment,
    setComment,
    comments,
    setComments
}: CommentViewPropsProps) => {
    const [users, setUsers] = useState<Map<string, UserResponse | undefined>>(new Map());
    const [likes, setLikes] = useState<Map<string, number | undefined>>(new Map());
    const [liked, setLiked] = useState<Map<string, boolean | undefined>>(new Map());
    const allComments = comments?.flatMap(c => getAllReplies(c));
    const cClass = comments?.map(c => new CommentClass(c));
    const allCClass = cClass?.flatMap(c => c.allReplies());
    const userIds = allComments?.map(c => c.userId).filter((value, index, array) => array.indexOf(value) === index) ?? [];
    useEffect(() => {
        Promise.all(userIds.map(id => getUser({ id: id ?? "" }))).then(ul => setUsers(new Map(ul.map(u => [u?.id ?? "", u]))));
        Promise.all(allComments?.map(c => getLikes({ liked: Liked.COMMENT, id: c.id }).then(l => ({
            comment: c.id,
            ...l
        }))) ?? []).then(ll => {
            setLikes(new Map(ll.map(l => [l.comment, l.likesCount])));
            setLiked(new Map(ll.map(l => [l.comment, l.myLike])));
        });
    }, [comments]);
    const CommentAndReplies = memo(({
        comment
    }: CommentAndRepliesProps): ReactElement => {
        return <Comment
            comment={comment}
            user={users.get(comment?.userId ?? "")}
            cUser={user}
            likes={likes.get(comment?.id ?? "")}
            liked={liked.get(comment?.id ?? "")}
            setLiked={l => {
                if(!comment) return
                const likeFun = l ? like : unlike;
                likeFun({ liked: Liked.COMMENT, id: comment.id }).then(() => {
                    const newLikes = new Map(likes);
                    newLikes.set(comment.id, (likes.get(comment.id) ?? 0) + (l ? 1 : -1));
                    setLikes(newLikes);
                    const newLiked = new Map(liked);
                    newLiked.set(comment.id, l);
                    setLiked(newLiked);
                });
            }}
            reply={r => {
                if(!r) return;
                const ccl = allCClass?.find(c => c.id === comment?.id);
                if(!ccl) return;
                const newR = new CommentClass({
                    parent: ccl,
                    ...r
                })
                if(ccl.replies) ccl.replies.push(newR);
                else ccl.replies = [newR];
                setComments?.(cClass?.map(c => c.toJSON()));
            }}
            edit={c => {
                const ccl = allCClass?.find(c => c.id === comment?.id);
                if(!ccl) return;
                ccl.content = c;
                setComments?.(cClass?.map(c => c.toJSON()));
            }}
            delComment={c => {
                if(!c) return;
                const ccl = allCClass?.find(c => c.id === comment?.id);
                if(!ccl) return;
                if(ccl.replies?.length) {
                    ccl.userId = undefined;
                    ccl.content = undefined;
                } else if (ccl.parent) {
                    ccl.parent.replies = ccl.parent.replies?.filter(r => r.id !== ccl.id);
                    setComments?.(cClass?.map(c => c.toJSON()));
                }
                else setComments?.(cClass?.filter(c => c.id !== ccl.id).map(c => c.toJSON()));
            }}
        >{comment?.replies?.map((r, index) => <CommentAndReplies
                key={index}
                comment={r}
            />)}
        </Comment>
    });

    return (
        <>
            <AuthField
                textArea
                name={`Comments (${tree?.comments})`}
                value={comment}
                setValue={setComment}
                placeholder="Add Comment..."
                setIcon
                icon="fa-plus"
                onClick={comment?.length && tree?.id ? () => createComment({ treeId: tree.id, content: comment }).then(c => {
                    if(c) {
                        setComments?.([...comments ?? [], c]);
                        const { comments: com, ...t } = tree;
                        setTree?.({
                            comments: com + 1,
                            ...t
                        });
                        setComment?.("");
                        notificationService.emit({
                            fun: NotiFunc.COMMENT,
                            commentId: c.id,
                            treeId: tree.id
                        });
                    }
                }) : undefined}
            />
            {comments?.map((c, index) => <CommentAndReplies
                key={index}
                comment={c}
            />)}
        </>
    );
}