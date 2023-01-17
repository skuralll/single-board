import { HStack, Box, Avatar, Heading, Text, WrapItem } from "@chakra-ui/react";

import { IComment, IUser } from "../models";
import { primaryColor } from "../theme";

// ダミーデータ
const user1: IUser = {
    displayName: "testuser1",
    photoURL: "https://scrapbox.io/files/63c27922300b77001e1a30ae.jpg",
};
const comments: IComment[] = [
    {
        user: user1,
        content: "first comment ss",
        createdAt: new Date(),
        id: "comment1id",
    },
    {
        user: user1,
        content: "元気ですか",
        createdAt: new Date(),
        id: "comment2id",
    },
];

export const CommentList = () => {
    return (
        <>
            <Heading mt={4} mb={2} size="md" color="gray.600">
                Posted Comments
            </Heading>
            <ul>
                {comments.length === 0 ? (
                    <p>No Post</p>
                ) : (
                    comments.map((comment) => (
                        <Comment key={comment.id} comment={comment} />
                    ))
                )}
            </ul>
        </>
    );
};

const Comment = ({ comment }: { comment: IComment }) => (
    <Box bg="white" shadow="md" p={4} rounded="md">
        <HStack mb={2}>
            <Avatar
                size="xs"
                src={comment.user.photoURL ? comment.user.photoURL : undefined}
                bg={primaryColor}
            />
            <Heading size="sm" color="gray.700">
                {comment.user.displayName}
            </Heading>
        </HStack>
        <Text>{comment.content}</Text>
        <Text color="gray.400" mt={1} fontSize="sm" align="end">
            {comment.createdAt.toLocaleString()}
        </Text>
    </Box>
);
