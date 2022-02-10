import { FormEvent, useRef, useState } from 'react';
import { InferGetStaticPropsType } from 'next';
import type { GetStaticPaths, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';

import { createFeedback } from '@/lib/firestore';
import { FeedbackInputType, getAllFeedback, getAllSites } from '@/lib/firestore-admin';
import { useAuth } from '@/lib/auth';

import Feedback from '@/components/Feedback';
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

const FeedbackSite = ({ initialFeedback }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const auth = useAuth();
    const router = useRouter();
    const textInputRef = useRef<HTMLInputElement | null>(null);
    const [allFeedback, setAllFeedback] = useState(initialFeedback);

    const allFeedbackList = allFeedback!.map((feedback) => (
        <Feedback key={feedback.feedbackId} feedback={feedback} />
    ));
    const onSubmitHandler = (e: FormEvent) => {
        e.preventDefault();

        const newFeedback: FeedbackInputType = {
            author: auth?.user?.name as string,
            authorId: auth?.user?.uid as string,
            createdAt: new Date().toISOString(),
            provider: auth?.user?.provider as string,
            siteId: router.query.siteId as string,
            rating: 99999,
            status: '99999',
            text: textInputRef.current?.value as string,
        };

        setAllFeedback((prev) => [
            { feedbackId: `tempId-${new Date().toISOString()}`, ...newFeedback },
            ...prev!,
        ]);
        createFeedback(newFeedback);
        if (textInputRef.current) textInputRef.current.value = '';
    };

    return (
        <Box display='flex' flexDirection='column' w='full' maxW='700px' mx='auto' px={4}>
            <Box as='form' onSubmit={onSubmitHandler}>
                <FormControl my={8}>
                    <FormLabel htmlFor='commehnt'>Comment</FormLabel>
                    <Input id='comment' type='text' ref={textInputRef} />
                    <Button mt={2} fontWeight='medium' type='submit'>
                        Add Comment
                    </Button>
                </FormControl>
            </Box>

            {allFeedbackList}
        </Box>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const { sites } = await getAllSites();
    const paths = sites!.map((site) => ({ params: { siteId: site.siteId } }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const siteId = context.params!.siteId as string;
    const { feedback } = await getAllFeedback(siteId);

    return {
        props: {
            initialFeedback: feedback,
        },
        revalidate: 1,
    };
};
export default FeedbackSite;
