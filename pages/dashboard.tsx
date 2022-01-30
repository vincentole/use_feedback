import type { NextPage } from 'next';
import { useAuth } from '@/lib/auth';
import EmptyState from '@/components/EmtyState';
import { Button } from '@chakra-ui/react';

const Dashboard: NextPage = () => {
    const auth = useAuth();

    if (!auth?.user)
        return (
            <div>
                <div>Loading ...</div>
                <Button size='sm' mt='4' onClick={auth?.signinWithGitHub}>
                    Sign In
                </Button>
            </div>
        );

    return <EmptyState />;
};

export default Dashboard;
