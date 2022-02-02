import { SiteInputType } from '@/components/AddSiteModal';
import { compareDesc, parseISO } from 'date-fns';
import { db } from './firebase-admin';

export type FeedbackInputType = {
    author: string;
    authorId: string;
    createdAt: string;
    provider: string;
    rating: number;
    siteId: string;
    status: string;
    text: string;
};

export interface FeedbackDataInterface extends FeedbackInputType {
    feedbackId: string;
}

export type FeedbackAPIDataType = {
    feedback: FeedbackDataInterface[];
};

export async function getAllFeedback(siteId: string) {
    try {
        const snapshot = await db.collection('feedback').where('siteId', '==', siteId).get();
        const feedback: FeedbackDataInterface[] = [];

        snapshot.forEach((doc) => {
            feedback.push({ feedbackId: doc.id, ...(doc.data() as FeedbackInputType) });
        });

        feedback.sort((a, b) => compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)));

        return { feedback };
    } catch (error) {
        return { error };
    }
}

export interface SiteDataInterface extends SiteInputType {
    siteId: string;
}

export type SitesAPIDataType = {
    sites: SiteDataInterface[];
};

export async function getAllSites() {
    try {
        const snapshot = await db.collection('sites').get();
        const sites: SiteDataInterface[] = [];

        snapshot.forEach((doc) => {
            sites.push({ siteId: doc.id, ...(doc.data() as SiteInputType) });
        });

        return { sites };
    } catch (error) {
        return { error };
    }
}

export async function getUserSites(uid: string) {
    const snapshot = await db.collection('sites').where('userId', '==', uid).get();
    const sites: SiteDataInterface[] = [];

    snapshot.forEach((doc) => {
        sites.push({ siteId: doc.id, ...(doc.data() as SiteInputType) });
    });

    return { sites };
}

export async function getUserFeedback(uid: string) {
    const snapshot = await db.collection('feedback').where('authorId', '==', uid).get();
    const feedback: FeedbackDataInterface[] = [];

    snapshot.forEach((doc) => {
        feedback.push({ feedbackId: doc.id, ...(doc.data() as FeedbackInputType) });
    });

    return { feedback };
}
