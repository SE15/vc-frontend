import {
    Box,
    FormControl,
    Input,
    useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import GridComponent from '../../components/ContainerTemplates/GridComponent';
import { connect } from 'react-redux';

import { editUserProfile } from '../../api';
import * as actions from '../../store/actions';

export const ChangeName = ({ user, firstName, lastName, updateName, onLogout }) => {
    const [first_name, setFirstName] = useState(firstName);
    const [last_name, setLastName] = useState(lastName);
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const handleChange = (field, e) => {
        let textField = e.target.value;
        if (field === 'first_name') setFirstName(textField);
        else setLastName(textField);
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);

        const result = await editUserProfile(user, { method: 'edit-info', first_name: first_name, last_name: last_name });
        if (result.data) {
            toast({
                position: "bottom-left",
                title: `Changed name successfully`,
                description: `You have updated your name to '${first_name} ${last_name}'`,
                status: "success",
                isClosable: true,
                htmlWidth: 200
            });
            updateName(first_name, last_name);
        } else {
            toast({
                position: "bottom-left",
                title: 'Changing name failed',
                description: result.message,
                status: "error",
                isClosable: true,
                htmlWidth: 200
            });
        }
        setLoading(false);
    }

    return (
        <GridComponent
            heading="Change Your Name"
            isConfirm={true}
            onClick={submitHandler.bind(this)}
            loading={loading}
            disabled={firstName === first_name && lastName === last_name}>
            <FormControl align="center">
                <Box borderColor="blue.500" w="50%">
                    <Input
                        isRequired
                        type="text"
                        placeholder="First Name"
                        size="lg"
                        value={first_name}
                        onChange={handleChange.bind(this, "first_name")}
                    />
                </Box>
            </FormControl>
            <FormControl align="center">
                <Box borderColor="blue.500" w="50%">
                    <Input
                        isRequired
                        type="text"
                        placeholder="Last Name"
                        colorScheme="black"
                        size="lg"
                        value={last_name}
                        onChange={handleChange.bind(this, "last_name")}
                    />
                </Box>
            </FormControl>
        </GridComponent>
    );
}

const mapStateToProps = state => {
    return {
        user: state.user,
        firstName: state.firstName,
        lastName: state.lastName
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateName: (firstName, lastName) => dispatch(actions.updateName(firstName, lastName))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeName);