import React, { Component } from 'react'
import {
    Input, Stack, Button, InputGroup, Box,
    HStack, Divider, FormControl, useToast, Heading, Text, InputRightElement, IconButton, Spinner, ReactRouterLink, Image
} from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';

import { createUser } from '../api';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

const withToast = (Component) => {
    return (props) => {
        const toast = useToast();
        const history = useHistory();
        return <Component {...props} toast={toast} history={history} />;
    }
}

class SignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        passwordConfirmed: false,
        show: false,
        loading: false
    }

    handleClick() {
        this.setState({
            ...this.state,
            show: !this.state.show
        });
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
        if (this.state.confirmPassword === this.state.password) {
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

        const result = await createUser((({ firstName, lastName, email, password }) => ({ firstName, lastName, email, password }))(this.state));
        if (result.data) {
            this.props.toast({
                position: "bottom-left",
                title: `Account created successfully`,
                description: `Sign in with your email and password`,
                status: "success",
                duration: 7000,
                isClosable: true,
                htmlWidth: 200
            });
            this.props.history.push('/');
        } else {
            this.props.toast({
                position: "bottom-left",
                title: `Account creation failed`,
                description: `${result.message}`,
                status: "error",
                duration: 7000,
                isClosable: true,
                htmlWidth: 200
            });
        }

        this.setState({
            ...this.state,
            loading: false
        })
    }

    render() {
        let form = (<Box p={8} maxWidth="85%" borderWidth={3} borderRadius={8} boxShadow="lg" bg="white.200" borderColor="purple.100">
            <HStack textAlign="center" color="blueGreen.100" textStyle="h1" wrap="wrap">
                <Heading fontSize="24px"> Create Your Own </Heading> <Heading fontSize="24px" color="purple.700">Volunteer Profile! </Heading>
            </HStack>
            <Box my={4} textAlign="left">
                <form action='submit' onSubmit={this.submitHandler}>
                    <Stack spacing={3}>
                        <HStack>
                            <FormControl isRequired>
                                <InputGroup>
                                    <Input type='text' onChange={this.handleChange.bind(this, "firstName")} value={this.state.firstName} placeholder='First Name' bg="white.100" color="black.600" width="100%" borderColor="blueGreen.100" />
                                </InputGroup>
                            </FormControl>
                            <FormControl isRequired>
                                <InputGroup>
                                    <Input type='text' onChange={this.handleChange.bind(this, "lastName")} value={this.state.lastName} placeholder='Last Name' bg="white.100" color="black.600" borderColor="blueGreen.100" />
                                </InputGroup>
                            </FormControl>
                        </HStack>
                        <FormControl isRequired>
                            <InputGroup>
                                <Input type='email' onChange={this.handleChange.bind(this, "email")} value={this.state.email} placeholder='Email' bg="white.100" color="black.600" borderColor="blueGreen.100" />
                            </InputGroup>
                        </FormControl>
                        <FormControl isRequired>
                            <InputGroup>
                                <Input type={this.state.show ? "text" : "password"} onChange={this.handleChange.bind(this, "password")} value={this.state.password} aria-label='password' placeholder='Password' bg="white.100" color="black.600" borderColor="blueGreen.100" />
                                <InputRightElement>
                                    <IconButton aria-label="view password" h="1.75rem" colorScheme="gray" icon={<ViewIcon />} size="sm" onClick={this.handleClick.bind(this)} />
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <FormControl isRequired>
                            <InputGroup>
                                <Input type='password' focusBorderColor={this.state.passwordConfirmed ? this.state.password === "" ? "blue.400" : "green.400" : "red.400"} value={this.state.confirmPassword} borderColor={this.state.passwordConfirmed ? this.state.password === "" ? "blueGreen.400" : "green.400" : "red.400"} onChange={this.handleChange.bind(this, "confirmPassword")} aria-label='Confirm password' placeholder='Confirm Password' bg="white.100" color="black.600" />
                            </InputGroup>
                        </FormControl>

                        <Divider />

                        <Button type='submit' colorScheme="purple" isLoading={this.state.loading} isDisabled={!this.state.passwordConfirmed}>Sign Up!</Button>
                    </Stack>
                    <Link as={ReactRouterLink} to="/">
                        <Text textStyle="h2" color="purple.700" pt={4}>
                            Already Registered? Sign In
                    </Text>
                    </Link>
                </form>
            </Box>
        </Box>);

        return (
            <HStack spacing={20} pt={window.innerHeight / 15} px={window.innerWidth / 45} justify="center">
                <Image
                    boxSize="20%"
                    src="/signup-bg1.png"
                />
                {form}
                <Image
                    boxSize="20%"
                    src="/signup-bg2.png"
                />
            </HStack>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.loading,
    };
};

export default connect(mapStateToProps)(withToast(SignUp));