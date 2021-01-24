import React, { Component } from "react";
import ProfileInfo from "../components/ProfileInfo";
import { Box, Heading, Wrap, WrapItem, Center, VStack, Spacer, Flex } from "@chakra-ui/react";
import Recommendation from  '../components/Recommendation.jsx';
import RecommendationPost from  '../popups/RecommendationPost.jsx';


class Profile extends Component {
    constructor(props)
    {
        super(props);
    }

    render() {
        return (
            <div>
                <ProfileInfo name="Danushka Gunathilake" button={this.props.button} />
                <Box h={3}/>
                <Wrap justify="space-around">
                    <TempBox name = "Skills"/>
                    <TempBox name = "Connections"/>
                    
                    <TempBox name = "Recommendations" button = {<RecommendationPost />}>
                    <Recommendation postedBy = "Angelo Mathews" recommendation = "Hello World Hello World"/>
                    <Recommendation postedBy = "Mahela Jayawardena" recommendation = "Good good good good good"/>
                    </TempBox>
                </Wrap>
            </div>
        );
    }
}

const TempBox = (props) => {
    return (
        <WrapItem>
        <Box bg="gray.200" w="400px" h="400px">
            <Center m = {4}>
                <Heading size="md" color="gray.600">{props.name}</Heading>
            </Center>
            <Box bg="gray.200" w="370px" h="280px" p = {0}>
            <VStack>
                {props.children}
            </VStack>
            </Box>
            <Center>{props.button}</Center>
        </Box>
      </WrapItem>
    );
}
export default Profile;