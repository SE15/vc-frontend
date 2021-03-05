import React, { Component } from "react";
import ProfileInfo from "../components/ProfileInfo";
import { Box, Center, Wrap, Spinner } from "@chakra-ui/react"
import TempBox from "../components/TempBox"
import axios from "axios";

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
                }})
                .catch(err => console.error(err));
    }

    render() {
        if (this.state.loading) {
            return (
                <div>
                    <Center>
                        <Spinner
                            thickness="5px"
                            speed="0.65s"
                            emptyColor="black"
                            color="white"
                            size="xl"
                        />
                    </Center>
                </div>
            );
        } else {
            return (
                <div>
                    <ProfileInfo name={this.state.profile.first_name + " " + this.state.profile.last_name} button="1" visit={this.state.visit} />
                    <Box h={3} />
                    <Wrap justify="space-around">
                        {/* visit method will show whether a user or guest */}
                        <TempBox name="Skills" data={this.state.skill} visit={this.state.visit} />
                        <TempBox name="Connections" data={this.state.connections} visit={this.state.visit} />
                        <TempBox name="Recommendations" data={this.state.recommendation} visit={this.state.visit} />
                    </Wrap>
                </div>
            );
        }

    }
}


export default Profile;