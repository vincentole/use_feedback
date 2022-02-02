// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { FeedbackAPIDataType, getAllFeedback } from '@/lib/firestore-admin';
import logger from '@/utils/logger';
import type { NextApiRequest, NextApiResponse } from 'next';

// API
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<FeedbackAPIDataType | { error: any }>,
) {
    const site = req.query.siteId as string;
    try {
        const { feedback } = await getAllFeedback(site);

        res.status(200).json({ feedback: feedback! });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: error });
    }
}
