import { SiteInputType } from '@/components/AddSiteModal';
import { doc, setDoc, addDoc, deleteDoc, collection } from 'firebase/firestore';
import { MyUserTypeWithoutTokenType } from './auth';
import { db } from '@/lib/firebase';
import { FeedbackInputType } from './firestore-admin';

async function createUser(user: MyUserTypeWithoutTokenType) {
    const userRef = doc(db, 'users', `${user.uid}`);

    setDoc(userRef, { ...user }, { merge: true });
}

async function createSite(data: SiteInputType) {
    const siteRef = addDoc(collection(db, 'sites'), {
        ...data,
    });
}

async function createFeedback(feedback: FeedbackInputType) {
    const feedbackRef = addDoc(collection(db, 'feedback'), {
        ...feedback,
    });
}

async function deleteFeedback(feedbackId: string) {
    await deleteDoc(doc(db, 'feedback', feedbackId));
}

export { createUser, createSite, createFeedback, deleteFeedback };
