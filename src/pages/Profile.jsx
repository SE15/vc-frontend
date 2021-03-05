import React, { Component } from "react";
import ProfileInfo from "../components/ProfileInfo";
import { Box, Center, Wrap, Spinner, HStack, VStack } from "@chakra-ui/react"
import TempBox from "../components/TempBox"
import axios from "axios";
import CardHolder from '../components/ContainerTemplates/CardHolder';
import SkilLCard from '../components/Skill/SkillCard';
import Recommendation from '../components/Recommendation/Recommendation';
import Connection from '../components/Connection/Connection';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {},
            skill: {},
            recommendation: {},
            connections: {},
            loading: true,
            visit: false
        };
    }

    async componentDidMount() {
        console.log(this.props.userId)
        if (this.props.userId) {
            console.log(this.props.userId)
        }
        const token = localStorage.getItem('token');
        console.log(" sd" + token);
        let data = {
            headers: {
                'Access-Control-Allow-Headers': 'x-Auth-token',
                'x-Auth-token': token
            }
        }


        axios.get("http://localhost:5000/users/2", Object.assign({}, {}, data))
            .then((result) => {
                if (result.data.results) {
                    this.setState({
                        profile: result.data.results[0][0],
                        skill: result.data.results[1],
                        recommendation: result.data.results[2],
                        connections: result.data.results[3],
                        loading: false
                    });
                } else {

                    console.log(result.data.message);
                }
            })
            .catch(err => console.error(err));
    }

    render() {
        return (
            <VStack w="100%" align="center" px={window.innerWidth / 25} pb={window.innerWidth / 25}>
                <ProfileInfo name={this.state.profile.first_name + " " + this.state.profile.last_name} button="2" visit={1} isLoading={this.state.loading}/>
                {/* <Wrap>
                        <TempBox name="Skills" data={this.state.skill} visit={this.state.visit} />
                        <TempBox name="Connections" data={this.state.connections} visit={this.state.visit} />
                        <TempBox name="Recommendations" data={this.state.recommendation} visit={this.state.visit} />
                    </Wrap> */}
                <HStack spacing={6} w="100%">
                    <CardHolder
                        heading="Skills"
                        isLoading={this.state.loading}
                    >
                        <SkilLCard
                            validations={2}
                            name="Project Management"
                            isOwner />
                        <SkilLCard
                            validations={2}
                            name="Project Management"
                            isOwner />
                    </CardHolder>
                    <CardHolder
                        heading="Recommendations"
                        isLoading={this.state.loading}
                    >
                        <Recommendation
                            description="He is a great individual with amazing time management skills"
                            author="Mahela Jayawardena"
                        />
                    </CardHolder>
                    <CardHolder
                        heading="Connections"
                        isLoading={this.state.loading}
                    >
                        <Connection
                            name="Kumar Sangakkara"
                            link="profile"
                        />
                    </CardHolder>
                </HStack>
            </VStack>
        );
    }
}


export default Profile;