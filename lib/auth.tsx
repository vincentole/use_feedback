import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/router';

import {getAuth, GithubAuthProvider, signInWithPopup, signOut, User } from 'firebase/auth';
import app from './firebase';


const auth = getAuth(app);
const ghProvider = new GithubAuthProvider();

type AuthContextType = {
    user: User | null
    loading: boolean;
    signinWithGitHub: () => void;
    signout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

function useProvideAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const signinWithGitHub = () => {
        return signInWithPopup(auth, ghProvider).then((result) => {
            setUser(result.user);
            return result.user;
        });
    };

    const signout = () => {
        router.push('/');

        return signOut(auth)
            .then(() => setUser(null));
    };

    return { user, loading, signinWithGitHub, signout };
}

export const AuthProvider: React.FC = ({ children }) => {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
