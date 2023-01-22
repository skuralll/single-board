import {
    collection,
    getDocs,
    deleteDoc,
    addDoc,
    Timestamp,
    doc,
} from "firebase/firestore";
import { firedb } from "../firebase";
import { IComment, ICommentAdd } from "../models";
import { getAuth } from "firebase/auth";

//DBからコメントリストを取得する
export const getComments = async () => {
    const snapShot = await getDocs(collection(firedb, "comments"));
    const data = snapShot.docs.map<IComment>((doc) => ({
        user: doc.data().user,
        content: doc.data().content,
        createdAt: doc.data().createdAt.toDate(),
        id: doc.id,
        favorites: doc.data().favorites,
    }));
    return data;
};

//DBにコメントを追加する
export const addComment = async (comment: ICommentAdd) => {
    try {
        await addDoc(collection(firedb, "comments"), {
            user: comment.user,
            content: comment.content,
            createdAt: Timestamp.now(),
            favorites: [],
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

//DBからコメントを削除する
export const deleteComment = async (id: string) => {
    try {
        await deleteDoc(doc(firedb, "comments", id));
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
};
