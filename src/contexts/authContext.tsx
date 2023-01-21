import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "firebase/auth";
import { auth } from "../firebase";

type AuthContextProps = {
    user: User | null;
};

const AuthContext = createContext<AuthContextProps>({
    user: null,
});

// 認証情報管理
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
