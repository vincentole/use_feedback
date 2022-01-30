import { useAuth } from '@/lib/auth';
import { LogoIcon } from '@/styles/theme';
import {
    Flex,
    Link,
    Avatar,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Stack,
    Heading,
} from '@chakra-ui/react';

const DashboardShell: React.FC = ({ children }) => {
    const auth = useAuth();

    return (
        <Flex flexDirection='column' grow='1'>
            <Flex justifyContent='space-between' backgroundColor='white' p={4}>
                <Stack isInline spacing={4} align='center'>
                    <LogoIcon boxSize={30} />
                    <Link>Sites</Link>
                    <Link>Feedback</Link>
                </Stack>

                <Stack isInline spacing={4} align='center'>
                    <Link>Account</Link>
                    <Avatar size='sm' src={auth?.user?.photoUrl as string} />
                </Stack>
            </Flex>
            <Flex backgroundColor='gray.100' p={8} grow='1'>
                <Flex direction='column' width='100%' maxW='800px' ml='auto' mr='auto'>
                    <Breadcrumb maxWidth={800} color='gray.600'>
                        <BreadcrumbItem isCurrentPage>
                            <BreadcrumbLink>Sites</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <Heading mb='4'>Sites</Heading>
                    {children}
                </Flex>
            </Flex>
        </Flex>
    );
};

export default DashboardShell;
