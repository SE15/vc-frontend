import React, { Component } from "react";
import ProfileInfo from "../components/ProfileInfo";
import { Box, Heading, Wrap, WrapItem, Center } from "@chakra-ui/react"


class Profile extends Component {
    constructor(props)
    {
        super(props);
    }

    render() {
        return (
            <div>
                <ProfileInfo name="Danushka Gunathilake" button="1" />
                <Box h={3}/>
                <Wrap justify="space-around">
                    <TempBox name = "Skills"/>
                    <TempBox name = "Connections"/>
                    <TempBox name = "Recommendations"/>
                </Wrap>
            </div>
        );
    }
}

const TempBox = (props) => {
    return (
        <WrapItem>
        <Box bg="gray.200" w="400px" h="400px" color="white">
            <Center m = {4}>
                <Heading size="md" color="gray.600">{props.name}</Heading>
            </Center>
        </Box>
      </WrapItem>
    );
}
export default Profile;