import { filter } from "@chakra-ui/react";
import { IComment } from "../models";

// つぶやきに関するAction
export type CommentsAction =
    | { type: "SET_COMMENTS"; comments: IComment[] }
    | { type: "ADD_COMMENT"; comment: IComment }
    | { type: "DELETE_COMMENT"; comment: IComment };

//コメントリストの状態
export type CommentsState = {
    comments: IComment[];
};

//コメントリストの初期状態
export const initialState: CommentsState = {
    comments: [],
};

export const commentsReducer = (
    state: CommentsState,
    action: CommentsAction
): CommentsState => {
    switch (action.type) {
        case "SET_COMMENTS":
            return { comments: action.comments };
        case "ADD_COMMENT":
            return { comments: [action.comment, ...state.comments] };
        case "DELETE_COMMENT":
            return {
                comments: state.comments.filter(
                    (comment) => comment.id !== action.comment.id
                ),
            };
        default:
            return state;
    }
};
