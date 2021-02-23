/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'

import{Input, Stack,Button,InputGroup, Box
,Divider, FormControl,Flex,Heading ,Text, Spinner, InputRightElement, IconButton} from '@chakra-ui/react';

import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import { Redirect } from 'react-router-dom';
import { ViewIcon } from '@chakra-ui/icons';

class Login extends Component {
    state = { 
        email: '',
        password: '',
        show: false
     }

    handleClick(){
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
        //console.log("token : "  + localStorage.getItem('token'))
        //console.log("user : "  + localStorage.getItem('user'))
    }
  
    handleChange(field, e){         
        let textField = e.target.value;        
        this.setState({
          ...this.state,
          [field]: textField
        });
    }

    render() {
        let form = 
            <Box p={8} maxWidth="95%" borderWidth={3} borderRadius={8} boxShadow="lg" bg="white.200" borderColor="blueGreen.100">
                <Box textAlign="center" color="blueGreen.100" textStyle="h1">
                    <Heading> Login </Heading>
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
                                        <IconButton aria-label="view password" h="1.75rem" colorScheme="gray" icon={<ViewIcon/>} size="sm" onClick={this.handleClick.bind(this)}/>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>

                            <Divider />

                            <Button type='submit' variant='solid' boxShadow='sm' _hover={{ boxShadow: 'md' }} bg="black.500">Log In!</Button>
                        </Stack>
                        <Text textStyle="h2" color="blue.200">
                            <br />
                            <a href="signup">Create New Account</a>
                        </Text>
                    </form>
                </Box>
            </Box>;

        if (this.props.loading) {
            form = <Spinner
            thickness="5px"
            speed="0.65s"
            emptyColor="black"
            color="white"
            size="xl"
          />;
        }
        
        if (this.props.error) 
        console.log(this.props.error.errorMessage);

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            console.log(localStorage.getItem('token'));
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        } else {
            authRedirect = <Redirect to='/login' />
        }

        return(
            [
                <Box h={window.innerHeight * 0.1} />,
                <Flex width="Full" align="center" justifyContent="center">
                    {form}
                </Flex>
            ]
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error,
        isAuthenticated: !(state.token === null || state.token === undefined),
        token : state.token,
        authRedirectPath: state.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/home'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);