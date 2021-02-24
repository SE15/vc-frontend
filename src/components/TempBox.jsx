import { Box, Button, Heading, WrapItem, Center,Spinner, VStack , ScrollView, Flex} from "@chakra-ui/react"

import React, { Component } from "react";

import axios from "axios";
import Skill from './Skills/Skill/Skill';
import Connections from './Connections/Connection/Connection';
import Reccomendation from './Reccomendation/Reccomendation';
import ReccomendationPost from './Reccomendation/ReccomendationPost';


class TempBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
          details: this.props.data,
          isLoading: false
        };
        console.log("constructor" + JSON.stringify(this.state.isLoading));
    }

    componentDidMount(){
        //this.callEvents();
        this.setState({
            ...this.state,
            isLoading: false
        });
        console.log("CDM" + this.props.loading)
    }

    componentDidUpdate(prevProps,prevState){
        // if (this.state.details.length!=prevState.details.length) {
        //     this.setState({
        //         ...this.state,
        //         isLoading: false
        //     });
        //     console.log("CDM" + this.props.isLoading)
        // }

        if(this.state.isLoading==true && prevState.isLoading==true){
            this.setState({
                ...this.state,
                isLoading: false
            });
        }
        console.log("CDU " + JSON.stringify(this.state.details));
        console.log("CDU pre" , prevState.details.size);
        console.log("CDU cu" ,this.state.isLoading);
    }

    eventHandler = (ev) => {
        // this.callEvents();
        this.setState({
            ...this.state,
        }); 
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

    async removeElement(skillname) {
        this.setState({
            ...this.state,
            isLoading: true
        });
        console.log("q" + JSON.stringify(this.state.details));
        console.log("q" + skillname);
        let filteredArray = this.state.details.filter(skill => skill.name !== skillname);
        this.setState({
                ...this.state,
                isLoading: true
            },
            function() {
                this.setState({
                    ...this.state,
                    details:filteredArray,
                },)
            },
            function(){console.log("il t " + JSON.stringify(this.state.isLoading))}
        );
        console.log("2" + JSON.stringify(this.state.details));
    }

    render() {
        console.log("render" + this.state.isLoading)
        if (this.state.isLoading) {
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
        }else{
            console.log("render" + this.state.details)
            return (
                <WrapItem>
                    <Flex>
                        <Box bg="gray.500" w="450px" h="450px" color="white">
                            <Center m = {4}>
                                <Heading size="md" color="gray.600">{this.props.name}</Heading>
                            </Center>
                            
                            <VStack overflowY="scroll" h="320px" w="436px" ml="2" mb="5">
                                
                                <BoxContent type = {this.props.name} detailss={this.state.details} visit={this.props.visit} onclick={this.removeElement.bind(this)}/>
                            
                            </VStack>
    
                            <Center>
                                <Box h={3}/>
                                    <EventButton new = {this.eventHandler.bind(this)} type = {this.props.name} visit={this.props.visit}/>
                                <Box h={3}/>
                            </Center>
                            
                        </Box>
                    </Flex>
              </WrapItem>
            );
        }
        
    }  
}


const BoxContent = (props) => {

    if (props.type == "Skills") {
        console.log("box" + props.detailss)
        return (
            <>
                 {
                    props.detailss.map((skill, i) =>
                        <Skill key={i} skillname={skill.name} validations={skill.validations} visit={props.visit} onClick={props.onclick}/>

                    )
                    
                }
                
            </>
            );
    } else if (props.type == "Connections") {
        return (
            <>
                {
                    props.detailss.map((connection, i) =>
                        <Connections key={i} cname={connection.first_name+" "+connection.last_name} cimage={null}/>
                    )
                        
                }
            </>
            );
    } else if (props.type == "Recommendations") {
        return (
            <>
                {
                    props.detailss.map((recommendation, i) =>
                        <Reccomendation key={i} postedBy={recommendation.first_name+" "+recommendation.last_name} postedImage="null" reccomendation={recommendation.description}/>
                    )
                        
                }
            </>
            );  
    } else {
        throw new Error("Invalid type for ConnectionButton");
    }
}

const EventButton = (props) => {
    if (props.type == "Skills") {
        if (props.visit) {
            return (
                <div>
    
                </div>);
        }else{
            return (
                <Button onClick={props.new} colorScheme="blue" variant="solid" >
                Add Skill
                </Button>);
        }
    } else if (props.type == "Connections") {
        return (
            <div>

            </div>);
    } else if (props.type == "Recommendations") {
        if (props.visit) {
            return (
                <ReccomendationPost onClick={props.new} name="Thushani Jayasekera" image="null"/>);
                // <Button  colorScheme="blue" variant="solid">
                // Add Recommendation
                // </Button>);  
        }else{
            return (
                <div>
    
                </div>);
        }
    } else {
        throw new Error("Invalid type for ConnectionButton");
    }
}

export default TempBox;