import React, { useRef } from "react";

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
} from "@chakra-ui/react";

export const CustomAlertDialog = ({
    title,
    content,
    yesText = "はい",
    noText = "いいえ",
    yesColor = "gray",
    noColor = "gray",
    isOpen,
    onClose,
    onYes = () => {},
    dialogRef,
}: {
    title: string;
    content: string;
    yesText?: string;
    noText?: string;
    yesColor?: string;
    noColor?: string;
    isOpen: boolean;
    onClose: () => void;
    onYes?: () => void;
    dialogRef: React.MutableRefObject<null>;
}) => {
    const cancelRef = useRef(null);

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            blockScrollOnMount={true}
            motionPreset="slideInBottom"
            isCentered
        >
            <AlertDialogOverlay />
            <AlertDialogContent>
                <AlertDialogHeader>{title}</AlertDialogHeader>

                <AlertDialogBody fontSize="1rem" color="gray.600">
                    {content}
                </AlertDialogBody>

                <AlertDialogFooter>
                    <Button
                        py=".5rem"
                        w="100px"
                        colorScheme={noColor}
                        ref={cancelRef}
                        onClick={onClose}
                    >
                        {noText}
                    </Button>

                    <Button
                        w="100px"
                        py="0.5rem"
                        colorScheme={yesColor}
                        onClick={() => {
                            onYes();
                            onClose();
                        }}
                        ml={3}
                    >
                        {yesText}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default CustomAlertDialog;
