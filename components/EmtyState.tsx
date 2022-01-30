import { Heading, Text, Button, VStack } from '@chakra-ui/react';
import AddSiteModal from './AddSiteModal';
import DashboardShell from './DashboardShell';

const EmptyState = () => (
    <DashboardShell>
        <VStack width='100%' backgroundColor='white' borderRadius='8px' p={'14'} spacing={3} >
            <Heading size='md'>You haven&apos;t added any sites.</Heading>
            <Text>Welchome 👋🏻 Let&apos;s get started.</Text>
            <AddSiteModal />
        </VStack>
    </DashboardShell>
);

export default EmptyState;
