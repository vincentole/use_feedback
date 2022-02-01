import { SitesAPIDataType } from '@/lib/firestore-admin';
import NextLink from 'next/link';
import { Table, Th, Tr, Td } from './Table';
import { format, parseISO } from 'date-fns';
import { Link } from '@chakra-ui/react';

const TableSites: React.FC<SitesAPIDataType> = ({ sites }) => {
    console.log(sites);
    return (
        <Table>
            <thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Site Link</Th>
                    <Th>Feedback Link</Th>
                    <Th>Date Added</Th>
                    <Th>{''}</Th>
                </Tr>
            </thead>
            <tbody>
                {sites.map((site) => {
                    return (
                        <Tr key={site.url} fontSize='sm'>
                            <Td fontWeight='medium'>{site.name}</Td>
                            <Td>{site.url}</Td>
                            <Td>
                                <NextLink
                                    href='/sites/[siteId]'
                                    as={`/sites/${site.siteId}`}
                                    passHref={true}
                                >
                                    <Link>View Feedback</Link>
                                </NextLink>
                            </Td>
                            <Td>{format(parseISO(site.createdAt), 'PPpp')}</Td>
                            <Td>Other</Td>
                        </Tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default TableSites;
