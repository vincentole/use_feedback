import Link from 'next/link';
import { SitesAPIData } from 'pages/api/sites';
import { Table, Th, Tr, Td } from './Table';

const TableSites: React.FC<SitesAPIData> = ({ sites }) => {
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
                                <Link href='#'>View Feedback</Link>
                            </Td>
                            <Td>
                                {new Date(site.createdAt).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    hourCycle: 'h12',
                                    minute: '2-digit',
                                })}
                            </Td>
                            <Td>Other</Td>
                        </Tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default TableSites;
