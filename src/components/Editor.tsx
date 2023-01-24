import { Button, Text, Textarea, VStack, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { addComment } from "../api/commentsApi";
import { useAuth } from "../contexts/authContext";
import { useComments } from "../contexts/commentsContext";
import { ICommentAdd } from "../models";

export const Editor = () => {
    const { user } = useAuth();
    const { dispatch } = useComments();
    const [content, setContent] = useState("");
    const toast = useToast();

    // 投稿成功時のトーストを表示する関数
    const showPostSuccessToast = () => {
        toast({
            title: "新しいコメントを投稿しました！",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };

    // ログインを求めるトーストを表示する関数
    const showPleaseLoginToast = () => {
        toast({
            title: "ログインしてください",
            status: "error",
            duration: 3000,
            isClosable: true,
        });
    };

    // Postボタンが押されたときの処理
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (content !== "" && user) {
            const toPost: ICommentAdd = {
                user: {
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                },
                content,
            };
            addComment({ ...toPost });
            dispatch({
                type: "ADD_COMMENT",
                comment: {
                    ...toPost,
                    createdAt: new Date(),
                    id: Date(),
                    favorites: [],
                },
            });
            showPostSuccessToast();
        } else if (!user) {
            showPleaseLoginToast();
        }
        setContent("");
    };
    // 内容画を書き換えたときの処理
    const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
        setContent(e.currentTarget.value);
    };

    return (
        <div>
            <VStack
                as="form"
                onSubmit={handleSubmit}
                p={4}
                pb={2}
                bg="white"
                rounded="md"
                shadow="md"
                alignItems="flex-end"
            >
                <Textarea
                    name="content"
                    value={content}
                    onChange={handleChange}
                    placeholder="What's on your mind?"
                />
                <Button type="submit" colorScheme="orange">
                    Post
                </Button>
            </VStack>
        </div>
    );
};
