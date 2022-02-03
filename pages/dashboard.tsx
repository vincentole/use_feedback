import type { NextPage } from 'next';
import { useAuth } from '@/lib/auth';
import EmptyState from '@/components/EmtyState';
import DashboardShell from '@/components/DashboardShell';
import TableSkeleton from '@/components/TableSkeleton';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import { SitesAPIDataType } from '@/lib/firestore-admin';

import TableSites from '@/components/TableSites';
import HeaderSites from '@/components/HeaderSites';

const Dashboard: NextPage = () => {
    const user = useAuth()?.user;
    const { data } = useSWR<SitesAPIDataType>(user ? ['/api/sites', user?.token] : null, fetcher);
    
    if (!data) {
        return (
            <DashboardShell>
                <HeaderSites />
                <TableSkeleton />
            </DashboardShell>
        );
    }

    if (data.sites.length === 0) {
        return (
            <DashboardShell>
                <HeaderSites />
                <EmptyState />
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            <HeaderSites />
            <TableSites sites={data.sites} />
        </DashboardShell>
    );
};

export default Dashboard;
