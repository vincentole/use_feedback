import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Heading } from "@chakra-ui/react";
import AddSiteModal from "./AddSiteModal";

const HeaderSites = () => {
    return (
        <>
            <Breadcrumb maxWidth={800} color='gray.600'>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>Sites</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <Flex justify='space-between' align='center'>
                <Heading mb='4'>Sites</Heading>
                <AddSiteModal>add Site</AddSiteModal>
            </Flex>
        </>
    );
};

export default HeaderSites;