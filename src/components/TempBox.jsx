import { Box, Button, Heading, WrapItem, Center,Text, VStack , ScrollView} from "@chakra-ui/react"

import React, { Component } from "react";

import axios from "axios";
import Skill from './Skill';
import Connections from './Connection';
import Reccomendation from './Reccomendation';
import ReccomendationPost from './ReccomendationPost';


class TempBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
          details: props.data
        };
        console.log(this.props.data);
      }
      componentDidMount(){
        //this.callEvents();
      }

      eventHandler = (ev) => {
       // this.callEvents();
        }

        callEvents = (e) => {
            axios.get("http://localhost:5000/api/users",{},{
            headers: {
            'Content-Type': 'application/json',
            'x-auth-token': 'avishka'
            }
          })
        .then((result) => {
            console.log(result.data);
            if(result.data.err!=1){
                this.setState({
                    users: result
                });
                //console.log(this.state.users);
            }else{

            }
            
        },
        (error) =>{
            console.log("Error");
        });
        }

    render() {
        return (
            <WrapItem>
            <Box bg="gray.500" w="450px" h="450px" color="white">
                <Center m = {4}>
                    <Heading size="md" color="gray.600">{this.props.name}</Heading>
                </Center>
                
                    <VStack overflowY="scroll" h="320px" w="436px" ml="2" mb="5">
                    
                    <BoxContent type = {this.props.name} detailss={this.props.data}/>
                
                    </VStack>

                <VStack>
                
                </VStack>
                <Center>
                    <Box h={3}/>
                        <EventButton new = {this.eventHandler.bind(this)} type = {this.props.name}/>
                    <Box h={3}/>
                </Center>
                
            </Box>
            
          </WrapItem>
        );
    }

    
}


const BoxContent = (props) => {
    if (props.type == "Skills") {
        return (
            <>
            {/* <Skill skillname="Organizing" validations={4} visit={true}/>
            <Skill skillname="Organizing" validations={4} visit={true}/>
            <Skill skillname="Organizing" validations={4} visit={true}/>
            <Skill skillname="Organizing" validations={4} visit={true}/>
            <Skill skillname="Organizing" validations={4} visit={true}/> */}
                {/* {
                    
                    props.detailss.map((skill, i) =>
                        <Skill key={i} skillname={skill.name} validations={skill.validations} visit={false}/>

                    )
                    
                } */}
                
            </>
            );
    } else if (props.type == "Connections") {
        return (
            
            <>
            {/* <Connections cname="Thushani Jayasekera" cimage={null}/>
            <Connections cname="Thushani Jayasekera" cimage={null}/>
            <Connections cname="Thushani Jayasekera" cimage={null}/>
            <Connections cname="Thushani Jayasekera" cimage={null}/>
            <Connections cname="Thushani Jayasekera" cimage={null}/> */}
                {/* {
                    
                    props.detailss.map((connection, i) =>
                        <Connections key={i} cname={connection.first_name+" "+connection.last_name} cimage={null}/>
                    )
                    
                } */}
                
            </>
            );
    } else if (props.type == "Recommendations") {
        return (
            
            <>
            {/* <Reccomendation postedBy="Thshhshs" postedImage="null" reccomendation="very gooddd fkejfkjfk mfsfmsfm smfs,fm"/>
            <Reccomendation postedBy="Thshhshs" postedImage="null" reccomendation="very gooddd fkejfkjfk mfsfmsfm smfs,fm"/>
            <Reccomendation postedBy="Thshhshs" postedImage="null" reccomendation="very gooddd fkejfkjfk mfsfmsfm smfs,fm"/>
            <Reccomendation postedBy="Thshhshs" postedImage="null" reccomendation="very gooddd fkejfkjfk mfsfmsfm smfs,fm"/>
            <Reccomendation postedBy="Thshhshs" postedImage="null" reccomendation="very gooddd fkejfkjfk mfsfmsfm smfs,fm"/> */}
                {/* {
                    
                    props.detailss.map((recommendation, i) =>
                        <Reccomendation key={i} postedBy={recommendation.first_name+" "+recommendation.last_name} postedImage="null" reccomendation={recommendation.description}/>
                    )
                    
                } */}
                
            </>
            );  
    } else {
        throw new Error("Invalid type for ConnectionButton");
    }
}

const EventButton = (props) => {
    if (props.type == "Skills") {
        return (
            <Button onClick={props.new} colorScheme="blue" variant="solid" >
            Add Skill
            </Button>);
    } else if (props.type == "Connections") {
        return (
            <Button onClick={props.new} colorScheme="blue" variant="solid">
            Add Connection
            </Button>);
    } else if (props.type == "Recommendations") {
        return (
            <ReccomendationPost onClick={props.new} name="Thushani Jayasekera" image="null"/>);
            // <Button  colorScheme="blue" variant="solid">
            // Add Recommendation
            // </Button>);  
    } else {
        throw new Error("Invalid type for ConnectionButton");
    }
}

export default TempBox;