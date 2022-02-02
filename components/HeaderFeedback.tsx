import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Heading } from '@chakra-ui/react';

const HeaderFeedback = () => {
    return (
        <>
            <Breadcrumb maxWidth={800} color='gray.600'>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>Feedback</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <Flex justify='space-between' align='center'>
                <Heading mb='4'>Feedback</Heading>
            </Flex>
        </>
    );
};

export default HeaderFeedback;
