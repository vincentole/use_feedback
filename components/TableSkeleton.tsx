import { Skeleton } from '@chakra-ui/react';
import { Table, Th, Tr, Td } from './Table';

const SkeletonRow = ({ width }: { width: string }) => {
    return (
        <Tr>
            <Td>
                <Skeleton height='10px' w={width} my={4} />
            </Td>
            <Td>
                <Skeleton height='10px' w={width} my={4} />
            </Td>
            <Td>
                <Skeleton height='10px' w={width} my={4} />
            </Td>
            <Td>
                <Skeleton height='10px' w={width} my={4} />
            </Td>
            <Td>
                <Skeleton height='10px' w={width} my={4} />
            </Td>
        </Tr>
    );
};

const TableSkeleton = () => {
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
                <SkeletonRow width='75%' />
                <SkeletonRow width='100%' />
                <SkeletonRow width='50%' />
                <SkeletonRow width='80%' />
                <SkeletonRow width='100%' />
            </tbody>
        </Table>
    );
};

export default TableSkeleton;
