import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import {
    GithubAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
    User,
} from 'firebase/auth';
import { auth } from './firebase';
import { createUser } from './firestore';

//  Types
export type MyUserType = Awaited<ReturnType<typeof formatUser>>;
export type MyUserTypeWithoutTokenType = Omit<Awaited<ReturnType<typeof formatUser>>, 'token'>;

type AuthContextType = {
    user: MyUserType | null;
    loading: boolean;
    signinWithGitHub: () => void;
    signout: () => void;
};

// Utils
async function formatUser(user: User) {
    const token = await user.getIdToken(true);

    return {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        provider: user.providerData[0].providerId,
        photoUrl: user.photoURL,
        token: token,
    };
}

// Context
const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<MyUserType | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const handleUser = async (rawUser?: User) => {
        if (rawUser) {
            const user = await formatUser(rawUser);
            const { token, ...userWithoutToken } = user;
            setUser(user);
            createUser(userWithoutToken);
            router.push('/dashboard');
            return user;
        } else {
            setUser(null);
            return null;
        }
    };

    const signinWithGitHub = () => {
        const ghProvider = new GithubAuthProvider();
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

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                formatUser(user).then((fUser) => {
                    setUser(fUser);
                });
            } else {
            }
        });
    }, []);

    return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

// Exports
export { AuthProvider, useAuth };
