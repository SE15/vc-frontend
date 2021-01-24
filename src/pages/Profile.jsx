import React, { Component } from "react";
import ProfileInfo from "../components/ProfileInfo";
import { Box, Heading, Wrap, WrapItem, Center, VStack, Spacer, Flex } from "@chakra-ui/react";
import Recommendation from  '../components/Recommendation.jsx';
import RecommendationPost from  '../popups/RecommendationPost.jsx';
import Skill from "../components/Skill.jsx";
import Connections from "../components/Connection.jsx";
import AddSkillButton from "../components/Login/Button/AddSkillButton.jsx"


class Profile extends Component {
    constructor(props)
    {
        super(props);
    }

    render() {
        return (
            <div>
                <ProfileInfo name="Lasith Malinga" button={this.props.button} />
                <Box h={3}/>
                <Wrap justify="space-around">
                    <TempBox name = "Skills">
                        <Skill skillname="Leadership__  " validations={15} name="Lasith Malinga" visit="0"/>
                        <Skill skillname="Organization" validations={10} visit="0"/>
                        <Skill skillname="Comunication" validations={9} visit="0"/>
                        <AddSkillButton/>


                        
                    </TempBox>

                    <TempBox name = "Connections">
                    <Connections cname="Sanjeewa Ranatunge" cimage={null}/>
                    <Connections cname="Sanjeew Ranasinghe" cimage={null}/>
                    <Connections cname="Kumar.L.Sangakkara" cimage={null}/>
                    <Connections cname="Sanjeewa Ranatunge" cimage={null}/>
                    <Connections cname="Arjuna Ranatunge  " cimage="https://minds-in-bloom.com/wp-content/uploads/2015/01/Maximizing-Time-with-Mentor-Texts-120x120.png"/>
                    </TempBox>
                    
                    <TempBox name = "Recommendations" button = {<RecommendationPost name="Lasith Malinga" image="https://minds-in-bloom.com/wp-content/uploads/2015/01/Maximizing-Time-with-Mentor-Texts-120x120.png"/>}>
                    
                    <Recommendation postedBy = "Mahela Jayawardena" recommendation = "A hardworking and intelligent individual."/>
                    <Recommendation postedBy = "Lasith Malinga" recommendation ="Impressive enthusiasm and professional demeanor."/>
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