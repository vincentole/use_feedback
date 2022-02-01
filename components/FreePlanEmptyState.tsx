import { Heading, Text, Button, VStack } from '@chakra-ui/react';

const FreePlanEmptyState = () => (
    <VStack width='100%' backgroundColor='white' borderRadius='8px' p={14} spacing={3}>
        <Heading size='md'>Get feedback on your site instantly.</Heading>
        <Text>Start today, then grow with us 🌱</Text>
        <Button>Upgrade to Starter</Button>
    </VStack>
);

export default FreePlanEmptyState;
