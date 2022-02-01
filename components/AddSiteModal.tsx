import { useAuth } from '@/lib/auth';
import { createSite } from '@/lib/firestore';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
    site: string;
    url: string;
};

export interface createSiteDataType extends Inputs {
    userId: string | undefined;
    createdAt: string;
}

const AddSiteModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef<HTMLInputElement>(null);
    const finalRef = useRef<HTMLButtonElement>(null);
    const toast = useToast();
    const auth = useAuth();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    const onCreateSite: SubmitHandler<Inputs> = (data, e) => {
        e!.preventDefault();
        createSite({
            userId: auth?.user?.uid,
            createdAt: new Date().toISOString(),
            ...data,
        });
        onClose();
        toast({
            title: 'Success!',
            description: "We've added your site.",
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
    };

    return (
        <>
            <Button ref={finalRef} onClick={onOpen}>
                Add your first Site.
            </Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent as='form' onSubmit={handleSubmit(onCreateSite)}>
                    <ModalHeader>Add Site</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel htmlFor='site'>Name</FormLabel>
                            <Input
                                id='site'
                                placeholder='My site'
                                {...register('site')}
                                required={true}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel htmlFor='url'>Link</FormLabel>
                            <Input
                                id='url'
                                placeholder='https://website.com'
                                {...register('url')}
                                required={true}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type='submit' colorScheme='blue' ml={3}>
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddSiteModal;
