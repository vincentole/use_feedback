// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAllSites, SitesAPIDataType } from '@/lib/firestore-admin';
import type { NextApiRequest, NextApiResponse } from 'next';

// API
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SitesAPIDataType | { error: any }>,
) {
    const { sites, error } = await getAllSites();

    if (error) {
        res.status(500).json({ error: error });
    }

    res.status(200).json({ sites: sites! });
}
