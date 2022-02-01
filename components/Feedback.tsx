import { FeedbackDataInterface } from '@/lib/firestore-admin';
import { Box, Divider, Heading, Text } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';

type FeedbackProps = {
    feedback: FeedbackDataInterface;
};

const Feedback: React.FC<FeedbackProps> = ({ feedback }) => {
    return (
        <Box borderRadius={4} maxW='700px' w='full' py={4}>
            <Heading pb={1} size='sm' as='h3' mb={0} color='gray.900' fontWeight='medium'>
                {feedback.author}
            </Heading>
            <Text color='gray.500' mb={4} fontSize='xs'>
                {format(parseISO(feedback.createdAt), 'PPpp')}
            </Text>
            <Text color='gray.800'>{feedback.text}</Text>
            <Divider borderColor='gray.200' backgroundColor='gray.200' mt={4} />
        </Box>
    );
};

export default Feedback;
