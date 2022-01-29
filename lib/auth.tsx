import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { getAuth, GithubAuthProvider, signInWithPopup, signOut, User } from 'firebase/auth';
import app from './firebase';

type AuthContextType = {
    user: User | null;
    loading: boolean;
    signinWithGitHub: () => void;
    signout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const auth = getAuth(app);
    const ghProvider = new GithubAuthProvider();

    const signinWithGitHub = () => {
        return signInWithPopup(auth, ghProvider).then((result) => {
            setUser(result.user);
            return result.user;
        });
    };

    const signout = () => {
        router.push('/');

        return signOut(auth).then(() => setUser(null));
    };

    const context = {
        user,
        loading,
        signinWithGitHub,
        signout,
    };

    return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
