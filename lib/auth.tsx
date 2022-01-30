import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { getAuth, GithubAuthProvider, signInWithPopup, signOut, User } from 'firebase/auth';
import app from './firebase';
import { createUser } from './firestore';

// Firebase
const auth = getAuth(app);
const ghProvider = new GithubAuthProvider();

//  Types
export type MyUser = ReturnType<typeof formatUser>;

type AuthContextType = {
    user: MyUser | null;
    loading: boolean;
    signinWithGitHub: () => void;
    signout: () => void;
};

// Utils
function formatUser(user: User) {
    return {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        provider: user.providerData[0].providerId,
        photoUrl: user.photoURL,
    };
}

// Context
const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<MyUser | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const handleUser = async (rawUser?: User) => {
        if (rawUser) {
            const user = formatUser(rawUser);

            setUser(user);
            createUser(user);
            router.push('/dashboard');
            return user;
        } else {
            setUser(null);
            return null;
        }
    };

    const signinWithGitHub = () => {
        return signInWithPopup(auth, ghProvider).then((result) => {
            return handleUser(result.user);
        });
    };

    const signout = () => {
        router.push('/');

        return signOut(auth).then(() => handleUser());
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

// Exports
export { AuthProvider, useAuth };
