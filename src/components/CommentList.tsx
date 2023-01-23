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
    Image,
    Link,
} from "@chakra-ui/react";
import { DeleteIcon, StarIcon } from "@chakra-ui/icons";
import reactStringReplace from "react-string-replace";
import { useEffect } from "react";
import { useComments } from "../contexts/commentsContext";
import { useAuth } from "../contexts/authContext";
import { IComment } from "../models";
import { primaryColor } from "../theme";
import { getComments, deleteComment, updateComment } from "../api/commentsApi";
import { detectURLs, checkIfImageExists } from "../utils";

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
