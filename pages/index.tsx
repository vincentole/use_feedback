import { Box, Button, Flex, Link, Text, VStack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useAuth } from '@/lib/auth';
import { GitHubIcon, GoogleIcon, LogoIcon } from '@/styles/theme';
import Head from 'next/head';
import NextLink from 'next/link';
import { ArrowRightIcon } from '@chakra-ui/icons';

const Home: NextPage = () => {
    const auth = useAuth();

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
            <Flex
                bg='gray.100'
                as='main'
                direction='column'
                align='center'
                justify='center'
                h='100vh'
                px={4}
            >
                {!auth?.user && (
                    <>
                        <LogoIcon boxSize={50} />
                        <Text
                            maxW='200px'
                            textAlign='center'
                            pt={4}
                            pb={8}
                        >{`This site is for testing purposes. Please don't use it.`}</Text>
                        <VStack>
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
                        </VStack>
                    </>
                )}
                {auth?.user && (
                    <>
                        <LogoIcon boxSize={50} />
                        <Text
                            maxW='200px'
                            textAlign='center'
                            py={4}
                        >{`This site is for testing purposes. Please don't use it.`}</Text>
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
                    </>
                )}
            </Flex>
        </>
    );
};

export default Home;
