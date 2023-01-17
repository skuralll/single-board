import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { theme } from "./theme";
import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { Home } from "./components/Home";

function App() {
    return (
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
