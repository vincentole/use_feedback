import { Button, Flex, Link, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useAuth } from '@/lib/auth';
import { LogoIcon } from '@/styles/theme';
import Head from 'next/head';
import NextLink from 'next/link';

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
            <Flex as='main' direction='column' align='center' justify='center' h='100vh'>
                {!auth?.user && (
                    <>
                        <LogoIcon boxSize={50} />
                        <Text
                            maxW='200px'
                            textAlign='center'
                            py={4}
                        >{`This site is for testing purposes. Please don't use it.`}</Text>
                        <Button size='sm' mt='4' onClick={auth?.signinWithGitHub}>
                            Sign In
                        </Button>
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
                            <Button size='sm' mt='4'>
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
