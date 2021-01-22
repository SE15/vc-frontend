import React, { Component } from "react";

import logo from '../assets/logo.png';

import { Image, Button, Box, Heading } from '@chakra-ui/core';

class Home extends Component {

    render() {
        return (
            <Profile name="Danushka Gunathilake" />
        );
    }


}

const Profile = (props) => {
    return (
        <center>
            <Image
                src={logo} //TODO: Need a method to update the profile pic
                htmlWidth="200px"
            />
            <Heading fontSize="25px"> {props.name} </Heading>
            <Box h={3} />
            <Button colorScheme="blue" variant="solid">
   Add Connection
  </Button>
        </center>
    );
}

export default Home;