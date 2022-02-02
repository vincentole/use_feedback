import type { NextPage } from 'next';
import { useAuth } from '@/lib/auth';
import EmptyState from '@/components/EmtyState';
import DashboardShell from '@/components/DashboardShell';
import TableSkeleton from '@/components/TableSkeleton';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import { FeedbackAPIDataType } from '@/lib/firestore-admin';

import TableFeedback from '@/components/TableFeedback';
import HeaderFeedback from '@/components/HeaderFeedback';

const Feedback: NextPage = () => {
    const user = useAuth()?.user;
    const { data } = useSWR<FeedbackAPIDataType>(
        user ? ['/api/feedback', user?.token] : null,
        fetcher,
    );

    if (!data) {
        return (
            <DashboardShell>
                <HeaderFeedback />
                <TableSkeleton />
            </DashboardShell>
        );
    }

    if (data.feedback.length === 0) {
        return (
            <DashboardShell>
                <HeaderFeedback />
                <EmptyState />
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            <HeaderFeedback />
            <TableFeedback feedback={data.feedback} />
        </DashboardShell>
    );
};

export default Feedback;
