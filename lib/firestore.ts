import { createSiteDataType } from '@/components/AddSiteModal';
import { doc, setDoc, addDoc, collection } from 'firebase/firestore';
import { MyUser } from './auth';
import { db } from '@/lib/firebase';

async function createUser(user: MyUser) {
    const userRef = doc(db, 'users', `${user.uid}`);

    setDoc(userRef, { ...user }, { merge: true });
}

async function createSite(data: createSiteDataType) {
    const siteRef = addDoc(collection(db, 'sites'), {
        ...data,
    });
}

export { createUser, createSite };
