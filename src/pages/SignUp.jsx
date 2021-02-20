import React, { Component } from 'react'
import{Input, Stack,Button,InputGroup, InputLeftElement, Box,
    HStack,Divider, FormControl,Flex,Heading,Text, InputRightElement, IconButton} from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';

import axios from 'axios';


class SignUp extends Component {
    state = { 
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        passwordConfirmed: true,
        show: false
     }

    handleClick(){
        this.setState({
            ...this.state,
            show: !this.state.show
        });
    }

    handleChange(field, e){         
        let textField = e.target.value; 
        this.setState({
            ...this.state,
            [field]: textField
        },
        function() {if (field=="confirmPassword" || field=="password")  this.checkPassword(textField)});
        
    }

    checkPassword(textField){
        if (this.state.confirmPassword==this.state.password) {
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

    submitHandler = (event) => {
        event.preventDefault();
        if(this.state.passwordConfirmed){
            // axios.post('http://localhost:5000/api/guests/users/registration', this.state)
            // .then(data => {
            //   console.log("RESPONSE: " + JSON.stringify(data))
            // })
            // .catch(err => {
            //  console.log("ERR: " + err.message)
            // })
            alert("SignUp is Success");
        }else{
            console.log("error")
        }
    }

    render() {

        const form = <Box p={8} maxWidth="85%" borderWidth={3} borderRadius={8} boxShadow="lg" bg="white.200" borderColor="blueGreen.100">
            <Box textAlign="center" color="blueGreen.100" textStyle="h1">
                <Heading> SignUp </Heading>
            </Box>
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
                                    <IconButton aria-label="view password" h="1.75rem" colorScheme="gray" icon={<ViewIcon/>} size="sm" onClick={this.handleClick.bind(this)}/>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <FormControl isRequired>
                            <InputGroup>
                                <Input type='password' focusBorderColor={this.state.passwordConfirmed ? this.state.password=="" ? "blue.400": "green.400" : "red.400"} value={this.state.confirmPassword} borderColor={this.state.passwordConfirmed ? this.state.password=="" ? "blueGreen.400": "green.400" : "red.400"} onChange={this.handleChange.bind(this, "confirmPassword")} aria-label='Confirm password' placeholder='Confirm Password' bg="white.100" color="black.600"/>
                            </InputGroup>
                        </FormControl>

                        <Divider />

                        <Button type='submit' variant='solid' boxShadow='sm' _hover={{ boxShadow: 'md' }} bg="black.500">Sign Up!</Button>
                    </Stack>
                    <Text textStyle="h2" color="blue.200">
                        <br />
                        <a href="#">Already Registered? Sign In</a>
                    </Text>
                </form>
            </Box>
        </Box>;

        return(
            [
                 <Box h={window.innerHeight*0.1} />,
                 <Flex width="Full" align="center" justifyContent="center">
                     {form}
                 </Flex>
             ]
        );
    }
}

export default SignUp;