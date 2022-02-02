import { FeedbackAPIDataType } from '@/lib/firestore-admin';
import { Table, Th, Tr, Td } from './Table';
import { Code, Switch } from '@chakra-ui/react';
import DeleteButton from './DeleteButton';

const TableFeedback: React.FC<FeedbackAPIDataType> = ({ feedback }) => {
    return (
        <Table>
            <thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Feedback</Th>
                    <Th>Route</Th>
                    <Th>Visible</Th>
                    <Th>{''}</Th>
                </Tr>
            </thead>
            <tbody>
                {feedback.map((sFeedback) => {
                    return (
                        <Tr key={sFeedback.feedbackId} fontSize='sm'>
                            <Td fontWeight='medium'>{sFeedback.author}</Td>
                            <Td>{sFeedback.text}</Td>
                            <Td>
                                <Code>{`/`}</Code>
                            </Td>
                            <Td>
                                <Switch
                                    colorScheme='green'
                                    size='md'
                                    defaultChecked={sFeedback.status === 'active'}
                                />
                            </Td>
                            <Td>
                                <DeleteButton feedbackId={sFeedback.feedbackId} />
                            </Td>
                        </Tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default TableFeedback;
