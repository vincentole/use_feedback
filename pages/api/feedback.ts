// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { auth } from '@/lib/firebase-admin';
import { FeedbackAPIDataType, getUserFeedback } from '@/lib/firestore-admin';
import logger from '@/utils/logger';
import type { NextApiRequest, NextApiResponse } from 'next';

// API
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<FeedbackAPIDataType | { error: any }>,
) {
    try {
        const { uid } = await auth.verifyIdToken(req.headers.token as string);
        const { feedback } = await getUserFeedback(uid);

        res.status(200).json({ feedback });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error });
    }
}
