import {
    Box,
    FormControl,
    Input
} from '@chakra-ui/react';
import React, { Component } from 'react';
import GridComponent from '../../components/ContainerTemplates/GridComponent';

//TODO: Complete form control
class ChangeName extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            firstName:'',
            lastName:''
         };
    }

    componentDidMount() {
        //load name api call
        this.setState({
            firstName:'need to call api',
            lastName:'need to call api'
        });
    }

    handleChange(field, e) {
        let textField = e.target.value;

        this.setState({
            ...this.state,
            [field]: textField
        });

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
                <GridComponent heading="Change Your Name" isConfirm={true}>
                    <FormControl align="center">
                        <Box borderColor="blue.500" w="50%">
                            <Input
                                isRequired
                                type="text"
                                placeholder="First Name"
                                size="lg"
                                value={this.state.firstName}
                                onChange={this.handleChange.bind(this,"firstName")}
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
                                value={this.state.lastName}
                                onChange={this.handleChange.bind(this,"lastName")}
                            />
                        </Box>
                    </FormControl>
                </GridComponent>
            </form>
        );
    }
}

export default ChangeName;