// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { FeedbackAPIDataType, getAllFeedback } from '@/lib/firestore-admin';
import type { NextApiRequest, NextApiResponse } from 'next';
import Error from 'next/error';

// API
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<FeedbackAPIDataType | { error: any }>,
) {
    const site = req.query.siteId as string;
    const { feedback, error } = await getAllFeedback(site);

    if (error) {
        res.status(500).json({ error: error });
    }

    res.status(200).json({ feedback: feedback! });
}
