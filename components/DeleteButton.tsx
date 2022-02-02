import { useRef, useState } from 'react';
import { deleteFeedback } from '@/lib/firestore';
import { DeleteIcon } from '@chakra-ui/icons';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    IconButton,
} from '@chakra-ui/react';
import { mutate } from 'swr';
import { useAuth } from '@/lib/auth';
import { FeedbackAPIDataType } from '@/lib/firestore-admin';

type DeleteButtonProps = {
    feedbackId: string;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ feedbackId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const user = useAuth()?.user;
    const onClose = () => setIsOpen(false);
    const onDeleteFeedback = () => {
        deleteFeedback(feedbackId);
        mutate(
            user ? ['/api/feedback', user.token] : null,
            async (data: FeedbackAPIDataType) => {
                const updatedFeedback = data.feedback.filter((f) => f.feedbackId !== feedbackId);
                return { feedback: updatedFeedback };
            },
            false,
        );
        onClose();
    };

    return (
        <>
            <IconButton
                aria-label='Delete feedback'
                icon={<DeleteIcon />}
                variant='ghost'
                onClick={() => setIsOpen(true)}
            />

            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Feedback
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            {"Are you sure? You can't undo this action afterwards."}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={onDeleteFeedback} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default DeleteButton;
