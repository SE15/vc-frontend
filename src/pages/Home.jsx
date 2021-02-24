import React, { Component } from "react";
import ProfileInfo from "../components/ProfileInfo";
import { Box, Heading, Wrap, WrapItem, Center, Spinner } from "@chakra-ui/react"
import TempBox from "../components/TempBox"
import { connect } from 'react-redux'
//import * as actions from '../store/actions/auth'
import { withRouter } from 'react-router-dom';

class Home extends Component {
    render() {
        if (this.props.user !== null) {
            console.log(this.props.user[1]);
            return (
                <div>
                    <ProfileInfo name={this.props.user[0][0].first_name+" "+this.props.user[0][0].last_name} button="0" />
                    <Box h={3}/>
                    <Wrap justify="space-around">
                        {/* visit method will show whether a user or guest */}
                        <TempBox name = "Skills" data={this.props.user[1]} visit={false}/>
                        <TempBox name = "Connections" data={this.props.user[2]} visit={false}/>
                        <TempBox name = "Recommendations" data={this.props.user[3]} visit={false}/>
                    </Wrap>
                </div>
            );
        } else {
            return (
                <Center>
                    <Spinner
                        thickness="5px"
                        speed="0.65s"
                        emptyColor="black"
                        color="white"
                        size="xl"
                    />
                </Center>
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