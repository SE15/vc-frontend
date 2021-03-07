import {
    Box,
    FormControl,
    Input
} from '@chakra-ui/react';
import React, { Component } from 'react';
import GridComponent from '../../components/ContainerTemplates/GridComponent';

//TODO: Complete form control
class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            currentPassword:'',
            password:'',
            confirmPassword:'',
            passwordConfirmed: false,
         };
    }

    componentDidMount() {
        //load name api call
        this.setState({
            ...this.state,
            currentPassword:'need to call api'
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
        if (this.state.confirmPassword === this.state.password && this.state.password!="") {
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
        console.log(this.state);
        // need to call change name api method
        // const result = await createUser((({ firstName, lastName, email, password }) => ({ firstName, lastName, email, password }))(this.state));
    }

    render() {
        return (
            <form action='submit' onSubmit={this.submitHandler.bind(this)}>
                <GridComponent heading="Change Your Password" isConfirm={this.state.passwordConfirmed?true:false}>
                    <FormControl align="center">
                        <Box borderColor="blue.500" w="50%">
                            <Input
                                isReadOnly
                                type="password"
                                placeholder="Current Password"
                                size="lg"
                                value={this.state.currentPassword}
                                onChange={this.handleChange.bind(this,"currentPassword")}
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
                                onChange={this.handleChange.bind(this,"password")}
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
                                onChange={this.handleChange.bind(this,"confirmPassword")}
                            />
                        </Box>
                    </FormControl>
                </GridComponent>
            </form>
        );
    }
}

export default ChangePassword;