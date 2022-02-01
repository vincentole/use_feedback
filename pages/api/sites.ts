// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from '@/lib/firebase-admin';
import type { NextApiRequest, NextApiResponse } from 'next';

// Types
type Data = {
    sites: any;
};

// API
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const snapshot = await db.collection('sites').get();
    const sites: any = [];

    snapshot.forEach((doc) => {
        sites.push({ siteId: doc.id, ...doc.data() });
    });

    res.status(200).json({ sites: sites });
}
