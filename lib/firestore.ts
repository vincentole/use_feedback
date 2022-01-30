import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { MyUser } from './auth';
import app from './firebase';

const db = getFirestore(app);

// TODO: Fix any type
async function createUser(user: MyUser) {
    const userRef = doc(db, 'users', `${user.uid}`);
    setDoc(userRef, { ...user }, { merge: true });
}



async function createSite(data: any) {
    const siteRef = doc(db, 'sites', 'mySites');
    setDoc(siteRef, { ...data }, { merge: true });
}

export { createUser, createSite };
