import {
    HStack,
    Box,
    Avatar,
    Heading,
    Text,
    Flex,
    Spacer,
    IconButton,
    Center,
    VStack,
    Link,
    useToast,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon, StarIcon } from "@chakra-ui/icons";
import reactStringReplace from "react-string-replace";
import React, { useEffect, useRef } from "react";
import { useComments } from "../contexts/commentsContext";
import { useAuth } from "../contexts/authContext";
import { IComment } from "../models";
import { primaryColor } from "../theme";
import { getComments, deleteComment, updateComment } from "../api/commentsApi";
import CustomAlertDialog from "./CustomAlertDialog";

export const CommentList = () => {
    const { state: comments, dispatch } = useComments();

    useEffect(() => {
        getComments().then((data) => {
            dispatch({ type: "SET_COMMENTS", comments: data });
        });
    }, [dispatch]);

    return (
        <>
            <Heading mt={4} mb={2} size="md" color="gray.600">
                Posted Comments
            </Heading>
            <ul>
                {comments.comments.length === 0 ? (
                    <p>No Post</p>
                ) : (
                    comments.comments.map((comment) => (
                        <Comment key={comment.id} comment={comment} />
                    ))
                )}
            </ul>
        </>
    );
};

//投稿
const Comment = ({ comment }: { comment: IComment }) => (
    <Box bg="white" shadow="lg" p={4} rounded="md" marginBottom="1">
        <Flex mb={5}>
            <HStack>
                <Avatar
                    size="xs"
                    src={
                        comment.user.photoURL
                            ? comment.user.photoURL
                            : undefined
                    }
                    bg={primaryColor}
                />
                <Heading size="sm" color="gray.700">
                    {comment.user.displayName}
                </Heading>
                <Text color="gray.500" mt={1} fontSize="sm" align="end">
                    {comment.createdAt.toLocaleString()}
                </Text>
            </HStack>
            <Spacer />
            <DeleteButton comment={comment} />
        </Flex>
        <CommentContent content={comment.content} />
        <Flex marginRight={3}>
            <Spacer />
            <FavoriteButton comment={comment} />
        </Flex>
    </Box>
);

// コメント本文
const CommentContent = ({ content }: { content: string }) => {
    //todo:画像の表示
    return (
        <VStack align="start">
            <Text>
                {reactStringReplace(
                    content,
                    /(https?:\/\/\S+)/g,
                    (match, i) => (
                        <Link key={i} href={match} color="blue.500">
                            {match}
                        </Link>
                    )
                )}
            </Text>
        </VStack>
    );
};

// 投稿削除ボタン(ユーザー=投稿者の時のみ表示)
const DeleteButton = ({ comment }: { comment: IComment }) => {
    const { user } = useAuth();
    const { dispatch } = useComments();
    const toast = useToast();
    // for dialog
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dialogRef = useRef(null);

    //クリック時の処理
    const handleDelBtClick = () => {
        try {
            deleteComment(comment.id);
            dispatch({
                type: "DELETE_COMMENT",
                comment: comment,
            });
            toast({
                title: "投稿を削除しました",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (e) {
            alert("delete failed");
        }
    };

    // ユーザー=投稿者の時のみ削除ボタンを表示
    if (user && user.uid === comment.user.uid) {
        return (
            <>
                <IconButton
                    aria-label="Delete chat "
                    variant="ghost"
                    size="sm"
                    icon={<DeleteIcon />}
                    onClick={onOpen}
                ></IconButton>
                <CustomAlertDialog
                    title="投稿を削除しますか？"
                    content="この操作は取り消すことができません"
                    yesText="削除"
                    noText="キャンセル"
                    yesColor="red"
                    dialogRef={dialogRef}
                    isOpen={isOpen}
                    onYes={handleDelBtClick}
                    onClose={onClose}
                />
            </>
        );
    }
    return <div></div>;
};

// ファボボタン
const FavoriteButton = ({ comment }: { comment: IComment }) => {
    const { user } = useAuth();
    const { dispatch } = useComments();
    const toast = useToast();

    const handleFavClick = () => {
        // ログインしていない場合
        if (!user) {
            toast({
                title: "ログインしてください",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        // 既にファボしていているか
        if (comment.favorites.includes(user.uid)) {
            comment.favorites = comment.favorites.filter(
                (id) => id !== user.uid
            );
        } else {
            // ファボする
            comment.favorites.push(user.uid);
        }
        //値を更新
        updateComment(comment);
        dispatch({
            type: "UPDATE_COMMENT",
            comment: comment,
        });
    };

    return (
        <Center>
            <IconButton
                aria-label="Favorite "
                color={
                    comment.favorites.includes(user?.uid || "")
                        ? "yellow.400"
                        : "gray.500"
                }
                size="md"
                variant="ghost"
                icon={<StarIcon />}
                onClick={handleFavClick}
            ></IconButton>
            <Text fontSize="lg" color="gray.500">
                {comment.favorites.length}
            </Text>
        </Center>
    );
};
