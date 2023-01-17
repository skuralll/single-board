import { Center, Heading, VStack } from "@chakra-ui/layout";
import { primaryTextColor } from "../theme";
import { auth } from "../firebase";
import StyledFirebaseAuth from "../StyledFirebaseAuth";
import { GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";

const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/",
    signInOptions: [
        GoogleAuthProvider.PROVIDER_ID,
        EmailAuthProvider.PROVIDER_ID,
    ],
};

export const Login = () => {
    return (
        <Center mt={8}>
            <VStack>
                <Heading size="md" color={primaryTextColor}>
                    Sign In
                </Heading>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
            </VStack>
        </Center>
    );
};
