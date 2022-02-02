import { useAuth } from '@/lib/auth';
import { LogoIcon } from '@/styles/theme';
import { Flex, Link, Avatar, Stack, Button } from '@chakra-ui/react';
import NextLink from 'next/link';

const DashboardShell: React.FC = ({ children }) => {
    const auth = useAuth();

    return (
        <Flex flexDirection='column' grow='1'>
            <Flex justifyContent='space-between' backgroundColor='white' p={4}>
                <Stack isInline spacing={4} align='center'>
                    <NextLink href='/' passHref>
                        <Link>
                            <LogoIcon boxSize={30} />
                        </Link>
                    </NextLink>
                    <NextLink href='/dashboard' passHref>
                        <Link>Sites</Link>
                    </NextLink>
                    <NextLink href='/feedback' passHref>
                        <Link>Feedback</Link>
                    </NextLink>
                </Stack>

                <Stack isInline spacing={4} align='center'>
                    {auth?.user && (
                        <Button onClick={auth?.signout} variant='link'>
                            Log Out
                        </Button>
                    )}
                    <Avatar size='sm' src={auth?.user?.photoUrl as string} />
                </Stack>
            </Flex>
            <Flex backgroundColor='gray.100' p={8} grow='1'>
                <Flex direction='column' width='100%' maxW='800px' ml='auto' mr='auto'>
                    {children}
                </Flex>
            </Flex>
        </Flex>
    );
};

export default DashboardShell;
