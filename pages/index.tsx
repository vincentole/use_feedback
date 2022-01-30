import { Button, Flex} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useAuth } from '@/lib/auth';
import { LogoIcon } from '@/styles/theme';

const Home: NextPage = () => {
    const auth = useAuth();

    return (
        <Flex as='main' direction='column' align='center' justify='center' h='100vh'>
            {!auth?.user && (
                <>
                    <LogoIcon boxSize={50} />
                    <Button size='sm' mt='4' onClick={auth?.signinWithGitHub}>
                        Sign In
                    </Button>
                </>
            )}
            {auth?.user && (
                <Button size='sm' mt='4' onClick={auth?.signout}>
                    Sign Out
                </Button>
            )}
        </Flex>
    );
};

export default Home;
