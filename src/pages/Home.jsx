import React, { Component } from "react";
import ProfileInfo from "../components/ProfileInfo";
import { Box, Heading, Wrap, WrapItem, Center, Spinner } from "@chakra-ui/react"
import TempBox from "../components/TempBox"
import { connect } from 'react-redux'
//import * as actions from '../store/actions/auth'
import { Redirect, withRouter } from 'react-router-dom';

import { searchUser } from '../api';

class Home extends Component {

    state = { 
        loading:true,
        profile:{},
        skill: {},
        recommendation:{},
        connections:{}
     }
        
    

    async componentDidMount() {
        console.log(this.props.isAuthenticated)
        console.log(this.props.user)
        if (this.props.isAuthenticated) {
            var response = await searchUser(2)
            console.log(response)
            if(response.data){
                this.setState({
                    ...this.state,
                    profile: response.data[0][0],
                    skill: response.data[1],
                    recommendation: response.data[2],
                    connections: response.data[3],
                    loading: false
                });
            }else{
                console.log(response.message);
            }
        }
    }

    render() {
        console.log("dfhD"+this.props.isAuthenticated)
        if (this.state.loading) {
            console.log("object")
            if (this.props.isAuthenticated) {
                console.log("1")
                return (
                    <Center>
                        <Spinner
                            thickness="5px"
                            speed="0.65s"
                            emptyColor="purple.700"
                            color="purple.200"
                            size="xl"
                        />
                    </Center>
                );
            } else {
                return (
                    <Center>
                        <Spinner
                            thickness="5px"
                            speed="0.65s"
                            emptyColor="purple.700"
                            color="purple.200"
                            size="xl"
                        />
                    </Center>
                );
            }
        }else{
            return (
                // <div>
                //     <ProfileInfo name={this.state.profile.first_name+" "+this.state.profile.last_name} button="0" />
                //     <Box h={3}/>
                //     <Wrap justify="space-around">
                //         {/* visit method will show whether a user or guest */}
                //         <TempBox name = "Skills" data={this.state.skill} visit={false}/>
                //         <TempBox name = "Connections" data={this.state.connections} visit={false}/>
                //         <TempBox name = "Recommendations" data={this.state.recommendation} visit={false}/>
                //     </Wrap>
                // </div>
                <Redirect to={{
                    pathname: "/user/profile",
                    state: { userId: this.props.user }
                  }} />
            );
        }
    }
}

const mapStateToProps = state => {
    return {
      isAuthenticated: state.token !== null,
      user: state.user
    };
  };

export default withRouter( connect( mapStateToProps )( Home ) );