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
} from "@chakra-ui/react";
import { DeleteIcon, StarIcon } from "@chakra-ui/icons";
import { useEffect } from "react";
import { useComments } from "../contexts/commentsContext";
import { useAuth } from "../contexts/authContext";
import { IComment } from "../models";
import { primaryColor } from "../theme";
import { getComments, deleteComment, updateComment } from "../api/commentsApi";

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
    <Box bg="white" shadow="md" p={4} rounded="md" marginBottom="1">
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
        <Text>{comment.content}</Text>
        <Flex marginRight={3}>
            <Spacer />
            <FavoriteButton comment={comment} />
        </Flex>
    </Box>
);

// 投稿削除ボタン(ユーザー=投稿者の時のみ表示)
const DeleteButton = ({ comment }: { comment: IComment }) => {
    const { user } = useAuth();
    const { dispatch } = useComments();

    //クリック時の処理
    const handleDelBtClick = () => {
        try {
            deleteComment(comment.id);
            dispatch({
                type: "DELETE_COMMENT",
                comment: comment,
            });
        } catch (e) {
            alert("delete failed");
        }
    };

    // ユーザー=投稿者の時のみ削除ボタンを表示
    if (user && user.uid === comment.user.uid) {
        return (
            <IconButton
                aria-label="Delete chat "
                variant="ghost"
                size="sm"
                icon={<DeleteIcon />}
                onClick={handleDelBtClick}
            ></IconButton>
        );
    }
    return <div></div>;
};

// ファボボタン
const FavoriteButton = ({ comment }: { comment: IComment }) => {
    const { user } = useAuth();
    const { dispatch } = useComments();

    const handleFavClick = () => {
        if (!user) return;
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
        <Center color="gray.600">
            <IconButton
                aria-label="Favorite "
                color={
                    comment.favorites.includes(user?.uid || "")
                        ? "yellow.400"
                        : "gray.600"
                }
                size="md"
                variant="ghost"
                icon={<StarIcon />}
                onClick={handleFavClick}
            ></IconButton>
            <Text fontSize="lg">{comment.favorites.length}</Text>
        </Center>
    );
};
