/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'

import {
    Input, Stack, Button, InputGroup, Box, ReactRouterLink
    , Divider, FormControl, Flex, Heading, Text, Spinner, InputRightElement, IconButton, HStack, Image
} from '@chakra-ui/react';

import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import { Redirect } from 'react-router-dom';
import { ViewIcon } from '@chakra-ui/icons';

import { Link } from 'react-router-dom';


class Login extends Component {
    state = {
        email: '',
        password: '',
        show: false
    }

    handleClick() {
        this.setState({
            ...this.state,
            show: !this.state.show
        });
    }

    componentDidMount() {
        if (this.props.authRedirectPath !== '/login') {
            this.props.onSetAuthRedirectPath();
        }
    }

    submitHandler = async (event) => {
        event.preventDefault();
        await this.props.onAuth(this.state.email, this.state.password);
    }

    handleChange(field, e) {
        let textField = e.target.value;
        this.setState({
            ...this.state,
            [field]: textField
        });
    }

    render() {
        let form =
            <Box p={8} maxWidth="95%" borderWidth={3} borderRadius={8} boxShadow="lg" bg="white.200" borderColor="purple.100" right={0} align="right">
                <Box textAlign="center" color="blueGreen.100" textStyle="h1">
                    <Heading color="gray.700"> Sign In </Heading>
                </Box>
                <Box my={4} textAlign="left">
                    <form action='submit' onSubmit={this.submitHandler}>
                        <Stack spacing={3}>
                            <FormControl isRequired>
                                <InputGroup>
                                    <Input type='email' placeholder='Email' bg="white.100" color="black.600" borderColor="blueGreen.100" onChange={this.handleChange.bind(this, "email")} value={this.state.email} />
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
                            <Divider />
                            <Button type='submit' colorScheme="purple" isLoading={this.props.loading}>Sign In</Button>
                        </Stack>
                        <Link as={ReactRouterLink} to="/signup" >
                            <Text textStyle="h2" color="purple.500" pt={4}>
                                Create New Account
                        </Text>
                        </Link>
                    </form>
                </Box>
            </Box>;

        console.log(this.props.isAuthenticated);
        console.log(this.props.authRedirectPath);
        if (this.props.isAuthenticated) {
            console.log("object");
            return (<Redirect to={this.props.authRedirectPath} />);
        }

        return (
            <HStack spacing={10} pt={window.innerHeight / 10} px={window.innerWidth / 50}>
                <Image
                    boxSize="70%"
                    src="/login-bg.png"
                />
                <Box h={window.innerHeight * 0.1} />,
                <Flex width="Full" align="center" justifyContent="center">
                    {form}
                </Flex>
            </HStack>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error,
        isAuthenticated: !(state.token === null || state.token === undefined),
        token: state.token,
        authRedirectPath: state.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);