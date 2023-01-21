// ユーザーモデル
export type IUser = {
    uid: string | null | undefined;
    displayName: string | null | undefined;
    photoURL: string | null | undefined;
};
// 発言モデル
export type IComment = {
    user: IUser;
    content: string;
    createdAt: Date;
    id: string;
};
// ?
export type ICommentAdd = {
    user: IUser;
    content: string;
};
