import { Heading, Text, Button, VStack, Box } from '@chakra-ui/react';
import AddSiteModal from './AddSiteModal';

const EmptyState = () => (
    <VStack width='100%' backgroundColor='white' borderRadius='8px' p={'14'} spacing={3}>
        <Heading size='md'>You haven&apos;t added any sites.</Heading>
        <Text>Welchome 👋🏻 Let&apos;s get started.</Text>
        <Box />
        <AddSiteModal>Add your first site.</AddSiteModal>
    </VStack>
);

export default EmptyState;
