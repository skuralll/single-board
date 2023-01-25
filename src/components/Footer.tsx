import { VStack, Text, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export const Footer = () => {
    return (
        <>
            <VStack
                justify="center"
                mt={5}
                mb={5}
                color="gray.700"
                fontSize="sm"
            >
                <Text align="center" mt={0} mb={0}>
                    このページはReact.jsで構築され、Firebase
                    Hostingによってホストされています
                </Text>
                <Link
                    href="https://github.com/skuralll/single-board"
                    isExternal
                >
                    GitHub Repository
                    <ExternalLinkIcon mx="2px" />
                </Link>
            </VStack>
        </>
    );
};
