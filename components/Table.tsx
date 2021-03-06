import {
    Text,
    Box,
    TableHeadProps,
    TableCellProps,
    TableRowProps,
    TableProps,
    Table as ChakraTable,
} from '@chakra-ui/react';

export const Th: React.FC<TableHeadProps> = (props) => {
    return (
        <Text
            as='th'
            textTransform='uppercase'
            fontSize='xs'
            color='gray.500'
            fontWeight='medium'
            px={4}
            py={2}
            {...props}
        />
    );
};

export const Td: React.FC<TableCellProps> = (props) => {
    return (
        <Box
            as='td'
            color='gray.900'
            p={4}
            borderBottom='1px solid'
            borderBottomColor='gray.100'
            {...props}
        />
    );
};

export const Tr: React.FC<TableRowProps> = (props) => {
    return (
        <Box
            as='tr'
            backgroundColor='white'
            borderTopLeftRadius={8}
            borderTopRightRadius={8}
            borderBottom='1px solid'
            borderBottomColor='gray.200'
            height='40px'
            {...props}
        />
    );
};

export const Table: React.FC<TableProps> = (props) => {
    return (
        <ChakraTable
            textAlign='left'
            backgroundColor='white'
            ml={0}
            mr={0}
            borderRadius={8}
            boxShadow='0px 4px 10px rgb(0,0,0, 0.05)'
            {...props}
        />
    );
};
