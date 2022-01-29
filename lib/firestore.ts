import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { MyUser } from './auth';
import app from './firebase';

const db = getFirestore(app);

// TODO: Fix any type
async function createUser(user: MyUser) {
    const userRef = doc(db, 'users', `${user.uid}`);
    setDoc(userRef, { ...user }, { merge: true });
}

export { createUser };
