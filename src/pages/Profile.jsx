import React, { Component } from "react";
import ProfileInfo from "../components/ProfileInfo";
import { Box, Heading, Wrap, WrapItem, Center } from "@chakra-ui/react"
import TempBox from "../components/TempBox"
import axios from "axios";

class Profile extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            profile:{},
            skill: {},
            recommendation:{},
            connections:{},

        };
    }

    async componentWillMount(){
        
        let data = {
            headers: {
            'Access-Control-Allow-Headers': 'x-Auth-token',
            'x-Auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsImlhdCI6MTYxMTQ5OTk5NSwiZXhwIjoxNjExNTAzNTk1fQ.zlAdtIrZDa20SrzrahSdMVmPmytUhmBhVQJGP9MBJ5M'
            }
          }
        const token = JSON.parse(localStorage.getItem('token'));
        const result = await axios.get("http://localhost:5000/api/users/2",Object.assign({}, {}, data))
        .then((result) => {
            console.log(result);
            if(result.data.err==0){
                this.setState({
                    profile: result.data.obj[0][0],
                    skill: result.data.obj[1],
                    recommendation: result.data.obj[2],
                    connections: result.data.obj[3]
                });
                console.log(this.state.skill);
            }else{
                console.log(result.data.msg);
            }
            
        },
        (error) =>{
            console.log("Error");
        });
    }

    render() {
        return (
            <div>
                <ProfileInfo name={this.state.profile.first_name+" "+this.state.profile.last_name} button="1" />
                <Box h={3}/>
                <Wrap justify="space-around">
                    {/* visit method will show whether a user or guest */}
                    <TempBox name = "Skills" data={this.state.skill} visit={false}/>
                    <TempBox name = "Connections" data={this.state.connections} visit={false}/>
                    <TempBox name = "Recommendations" data={this.state.recommendation} visit={false}/>
                </Wrap>
            </div>
        );
    }
}


export default Profile;