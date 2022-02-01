import { useAuth } from '@/lib/auth';
import { createSite } from '@/lib/firestore';
import { SitesAPIDataType } from '@/lib/firestore-admin';
import { AddIcon } from '@chakra-ui/icons';
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
import { useSWRConfig } from 'swr';

type Inputs = {
    name: string;
    url: string;
};

export interface SiteInputType extends Inputs {
    userId: string | undefined;
    createdAt: string;
}

const AddSiteModal: React.FC = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef<HTMLInputElement>(null);
    const finalRef = useRef<HTMLButtonElement>(null);
    const toast = useToast();
    const auth = useAuth();
    const { mutate } = useSWRConfig();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    const onCreateSite: SubmitHandler<Inputs> = ({ name, url }, e) => {
        e!.preventDefault();

        const newSite = {
            userId: auth?.user?.uid,
            createdAt: new Date().toISOString(),
            name,
            url,
        };

        createSite(newSite);
        onClose();
        toast({
            title: 'Success!',
            description: "We've added your site.",
            status: 'success',
            duration: 5000,
            isClosable: true,
        });

        mutate(
            auth?.user ? ['/api/sites', auth.user.token] : null,
            async (data: SitesAPIDataType) => {
                return { sites: [...data.sites, newSite] };
            },
            false,
        );
    };

    return (
        <>
            <Button
                ref={finalRef}
                onClick={onOpen}
                leftIcon={<AddIcon stroke='white' color='white' boxSize={2} />}
                rounded='sm'
                backgroundColor='gray.900'
                color='white'
                _hover={{ bg: 'gray.700' }}
                _active={{ bg: 'gray.800', transform: 'scale(0.95)' }}
                size='sm'
            >
                {children}
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
                            <FormLabel htmlFor='name'>Name</FormLabel>
                            <Input
                                id='name'
                                placeholder='My site'
                                {...register('name')}
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
