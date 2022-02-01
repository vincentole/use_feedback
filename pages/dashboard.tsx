import type { NextPage } from 'next';
import { useAuth } from '@/lib/auth';
import EmptyState from '@/components/EmtyState';
import DashboardShell from '@/components/DashboardShell';
import TableSkeleton from '@/components/TableSkeleton';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import { SitesAPIDataType } from './api/sites';
import TableSites from '@/components/TableSites';

const Dashboard: NextPage = () => {
    const { data } = useSWR<SitesAPIDataType>('/api/sites', fetcher);

    if (!data) {
        return (
            <DashboardShell>
                <TableSkeleton />
            </DashboardShell>
        );
    }

    if (data.sites.length === 0) {
        return (
            <DashboardShell>
                <EmptyState />
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            <TableSites sites={data.sites} />
        </DashboardShell>
    );
};

export default Dashboard;
