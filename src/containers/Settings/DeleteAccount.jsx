import {
    VStack,
    Button,
    Heading,
    Text,
    StackDivider,
    Spacer,
    Alert,
    AlertIcon,
    useDisclosure,
    useToast
} from '@chakra-ui/react';

import { useState } from 'react';
import PopupWindow from '../../components/ContainerTemplates/PopupWindow';

import * as actions from '../../store/actions';

import { deleteUser } from '../../api';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

export const DeleteAccount = ({user, onLogout}) => {
    const [loading, setLoading] = useState(false);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const toast = useToast();
    const history = useHistory();

    const onDelteAccount = async () => {
        setLoading(true);
        const result = await deleteUser(user);
        if (result.data) {
            toast({
                position: "bottom-left",
                title: `Account deleted successfully`,
                description: `You have deleted your account`,
                status: "success",
                isClosable: true,
                htmlWidth: 200
            });
            onLogout();
            history.push('/');
        } else {
            toast({
                position: "bottom-left",
                title: 'Account deleting failed',
                description: result.message,
                status: "error",
                isClosable: true,
                htmlWidth: 200
            });
        }
        setLoading(false);
    }

    return (
        <VStack py={5} w="100%" h="100%" justify="center">
            <Heading size="md" color="purple.700">
                Delete Your Account
        </Heading>
            <StackDivider borderColor="purple.100" borderWidth={1} />
            <Spacer />
            <VStack spacing={3}>
                <Button colorScheme="red" w="40%" onClick={onOpen} isDisabled={isOpen}>Delete Account</Button>
                <Alert status="error" w="80%">
                    <AlertIcon />
                    Once you delete your account, you cannot restore it.
                </Alert>
            </VStack>
            <PopupWindow
                title="Delete Account"
                buttonName="Delete"
                onClick={onDelteAccount}
                isLoading={loading}
                isOpen={isOpen}
                onClose={onClose}>
                <Text pb={2}>Do you wish to delete your account?</Text>
                <Alert status="warning" borderRadius="1rem" h="25%" w="100%" pt={2}>
                    <AlertIcon />
                    You cannot undo this action once you delete your account
                </Alert>
            </PopupWindow>
        </VStack>
    );
}

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout('/'))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccount);