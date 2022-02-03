import {
    Box,
    Button,
    Flex,
    HStack,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Text,
    Stack,
    VStack,
} from '@chakra-ui/react';
import type { InferGetStaticPropsType } from 'next';
import { useAuth } from '@/lib/auth';
import { GitHubIcon, GoogleIcon, LogoIcon } from '@/styles/theme';
import Head from 'next/head';
import NextLink from 'next/link';
import { ArrowRightIcon } from '@chakra-ui/icons';
import { getAllFeedback } from '@/lib/firestore-admin';
import Feedback from '@/components/Feedback';

const SITE_ID = 'Rnn5AQGUGfAhYSqfIZfJ';

const Home = ({ initialFeedback }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const auth = useAuth();

    const initialFeedbackList = initialFeedback!.map((feedback) => (
        <Feedback key={feedback.feedbackId} feedback={feedback} />
    ));

    console.log(initialFeedbackList);
    return (
        <>
            <Head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            if (document.cookie && document.cookie.includes('use-feedback-auth')) {
                                window.location.href = "/dashboard"
                            }
                            `,
                    }}
                />
            </Head>
            <Box as='main' h='100vh'>
                <Flex bg='gray.100' justify='center' px={8} py={12}>
                    <Box maxW='600px'>
                        <LogoIcon boxSize={50} />
                        <Alert rounded='md' mt={4} mb={8} status='error'>
                            <AlertIcon />
                            <AlertTitle mr={2}>Testing site.</AlertTitle>
                            <AlertDescription>
                                {`This site is for testing purposes only. Please don't use it.`}
                            </AlertDescription>
                        </Alert>
                        <HStack>
                            {!auth?.user && (
                                <>
                                    <Button
                                        onClick={auth?.signinWithGitHub}
                                        leftIcon={<GitHubIcon />}
                                        size='sm'
                                        backgroundColor='gray.900'
                                        color='white'
                                        fontWeight='medium'
                                        _hover={{ bg: 'gray.700' }}
                                        _active={{ bg: 'gray.800', transform: 'scale(0.95)' }}
                                    >
                                        Sign in with GitHub
                                    </Button>
                                    <Button
                                        onClick={auth?.signinWithGoogle}
                                        leftIcon={<GoogleIcon />}
                                        size='sm'
                                        backgroundColor='white'
                                        variant='outline'
                                        color='gray.900'
                                        fontWeight='medium'
                                        _hover={{ bg: 'gray.100' }}
                                        _active={{ bg: 'gray.200', transform: 'scale(0.95)' }}
                                    >
                                        Sign in with Google
                                    </Button>
                                </>
                            )}
                            {auth?.user && (
                                <NextLink href='/dashboard'>
                                    <Button
                                        px={2}
                                        py={1}
                                        rounded='md'
                                        rightIcon={<ArrowRightIcon boxSize={2.5} />}
                                        size='sm'
                                        backgroundColor='white'
                                        variant='outline'
                                        color='gray.900'
                                        fontWeight='medium'
                                        _hover={{ bg: 'gray.100' }}
                                        _active={{ bg: 'gray.200', transform: 'scale(0.95)' }}
                                    >
                                        View Dashboard
                                    </Button>
                                </NextLink>
                            )}
                        </HStack>
                    </Box>
                </Flex>
                <Box display='flex' flexDirection='column' w='full' maxW='700px' mx='auto' px={8}>
                    <HStack mt={8} mb={2} justify='space-between' wrap='wrap' gap={2}>
                        <NextLink href={`/sites/${SITE_ID}`}>
                            <Button
                                variant='link'
                                colorScheme=''
                                rightIcon={<ArrowRightIcon boxSize={2.5} />}
                            >
                                Leave a comment
                            </Button>
                        </NextLink>
                        <Box m='0' fontSize='sm' color='gray.500'>
                            Powered by Use Feedback
                        </Box>
                    </HStack>

                    {initialFeedbackList}
                </Box>
            </Box>
        </>
    );
};

export const getStaticProps = async () => {
    const siteId = SITE_ID;
    const { feedback } = await getAllFeedback(siteId);

    return {
        props: {
            initialFeedback: feedback,
        },
        revalidate: 1,
    };
};

export default Home;
