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
    favorites: string[]; // いいねしたユーザーのuidの配列
};

// 発言追加モデル
export type ICommentAdd = {
    user: IUser;
    content: string;
};
