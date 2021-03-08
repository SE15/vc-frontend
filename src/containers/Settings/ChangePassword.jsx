import {
    Box,
    FormControl,
    Input,
    useToast
} from '@chakra-ui/react';
import React, { Component } from 'react';
import GridComponent from '../../components/ContainerTemplates/GridComponent';


import { editUserProfile } from '../../api';
import { connect } from 'react-redux';

const withToast = (Component) => {
    return (props) => {
        const toast = useToast();
        return <Component {...props} toast={toast} />;
    }
}

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPassword: '',
            password: '',
            confirmPassword: '',
            passwordConfirmed: false,
            loading: false
        };
    }

    handleChange(field, e) {
        let textField = e.target.value;

        this.setState({
            ...this.state,
            [field]: textField
        },
            function () { if (field === "confirmPassword" || field === "password") this.checkPassword(textField) });

    }

    checkPassword(textField) {
        if (this.state.confirmPassword === this.state.password && this.state.password != "") {
            this.setState({
                ...this.state,
                passwordConfirmed: true
            })
        } else {
            this.setState({
                ...this.state,
                passwordConfirmed: false
            })
        }

    }

    submitHandler = async (event) => {
        event.preventDefault();
        this.setState({
            ...this.state,
            loading: true
        })

        const result = await editUserProfile(this.props.user, { method: 'change-password', oldPass: this.state.currentPassword, newPass: this.state.password })

        if (result.data) {
            this.props.toast({
                position: "bottom-left",
                title: `Password changed successfully`,
                description: `You have changed your password`,
                status: "success",
                isClosable: true,
                htmlWidth: 200
            });
            this.setState({
                currentPassword: '',
                password: '',
                confirmPassword: '',
                passwordConfirmed: false,
                loading: false
            });
        } else {
            this.props.toast({
                position: "bottom-left",
                title: 'Changing password failed',
                description: result.message,
                status: "error",
                isClosable: true,
                htmlWidth: 200
            });
        }
        this.setState({
            ...this.state,
            loading: false
        });
    }

    render() {
        return (
            <form action='submit' onSubmit={this.submitHandler.bind(this)}>
                <GridComponent heading="Change Your Password" isConfirm={true} loading={this.state.loading} disabled={!this.state.passwordConfirmed}>
                    <FormControl align="center">
                        <Box borderColor="blue.500" w="50%">
                            <Input
                                isRequired
                                type="password"
                                placeholder="Current Password"
                                size="lg"
                                value={this.state.currentPassword}
                                onChange={this.handleChange.bind(this, "currentPassword")}
                            />
                        </Box>
                    </FormControl>
                    <FormControl align="center">
                        <Box borderColor="blue.500" w="50%">
                            <Input
                                isRequired
                                type="password"
                                placeholder="New Password"
                                colorScheme="black"
                                size="lg"
                                value={this.state.password}
                                onChange={this.handleChange.bind(this, "password")}
                            />
                        </Box>
                    </FormControl>
                    <FormControl align="center">
                        <Box borderColor="blue.500" w="50%">
                            <Input
                                type="password"
                                placeholder="Confirm New Password"
                                colorScheme="black"
                                size="lg"
                                focusBorderColor={this.state.passwordConfirmed ? this.state.password === "" ? "blue.400" : "green.400" : "red.400"}
                                value={this.state.confirmPassword}
                                borderColor={this.state.passwordConfirmed ? this.state.password === '' ? "blueGreen.400" : "green.400" : "red.400"}
                                onChange={this.handleChange.bind(this, "confirmPassword")}
                            />
                        </Box>
                    </FormControl>
                </GridComponent>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    };
};


export default connect(mapStateToProps, null)(withToast(ChangePassword));