// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createSiteDataType } from '@/components/AddSiteModal';
import db from '@/lib/firebase-admin';
import type { NextApiRequest, NextApiResponse } from 'next';

// Types
export interface SiteData extends createSiteDataType {
    siteId: string;
}

export type SitesAPIData = {
    sites: SiteData[];
};

// API
export default async function handler(req: NextApiRequest, res: NextApiResponse<SitesAPIData>) {
    const snapshot = await db.collection('sites').get();
    const sites: SiteData[] = [];

    snapshot.forEach((doc) => {
        sites.push({ siteId: doc.id, ...(doc.data() as createSiteDataType) });
    });

    res.status(200).json({ sites: sites });
}
