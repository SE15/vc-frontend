import  React, {useState} from "react"

import PropTypes from "prop-types"
import {
    Button, Modal, ModalOverlay, ModalContent, Image
    , ModalCloseButton, Text, useDisclosure, ModalFooter,
     Textarea, Avatar, Stack, Heading, Box
} from '@chakra-ui/react';
import { kPrimaryBlackLight,kSecondaryBlueLight } from '../../constants';
import { Component } from "react";
import Reccomendation from "./Reccomendation";

class ReccomendationPost extends Component{
    constructor(props){
        super(props);    
    }
    render(){
    return (
        <>
            <ReccomendationButton id="rec_button"visit={props.visit} name={props.name} />
        </>
    );
    }
}



class ReccomendationButton extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: true,
            isOpen: false,
            isLoading: false,
            isreccomended: false,
            error: '',
            
        };
    }
    onClose=()=>{
        this.setState({
            ...this.state,
            isOpen: false
        }); 
    }
    onOpen= ()=>{
        this.setState({
            ...this.state,
            isOpen: true
        }); 
    }


    handleReccomendation= ()=>{
        this.setState({
            ...this.state,
            isLoading: true
        });
        try{
            //wait for update validation in db

            this.setState({
                ...this.state,
                isreccomended: true,
                isLoading: false
            });
        

        }catch{
            this.setState({
                ...this.state,
                isreccomended: false,
                isLoading: false,
                error: "Couldn't Post Reccomendation"
            });

        }
    }
    render(){
    if (this.props.visit == true && this.state.isLoggedIn == true && this.state.isreccomended==false) {

        return (
            <>
                <Box>
                    <Button id="post" onClick={()=>this.onOpen()} bg={kSecondaryBlueLight} isDisabled={false}>Post Reccomendation</Button>
                </Box>
                <Modal isOpen={this.state.isOpen} onClose={()=>onClose()} color="black.700" closeOnOverlayClick="false">
                    <ModalOverlay />
                    <ModalContent>
                        <Box bg={kPrimaryBlackLight} w="100%" p={4} color="white">
                            <Stack>
                                <Heading color="black.400" fontSize="lg">
                                    Post Reccomendation
                                </Heading>
                                <br />
                                <Stack direction="row">
                                    {this.props.cimage!=null?(
                                        <Image src={this.props.image}  borderRadius="full" boxSize="3rem" />
                                    ) :(
                                        <Avatar name={this.props.name} src="https://bit.ly/broken-link" />
                                    )
                                    }
                                    <Text color={kSecondaryBlueLight}>
                                        {this.props.name}
                                    </Text>
                   
                                    <Textarea placeholder="Enter reccomendation" color="black.400" />
                                    
                                    <ModalCloseButton />
                                </Stack>
                            </Stack>
                            <ModalFooter>
                                <Button colorScheme="blue" mr={3} onClick={()=>handleReccomendation()}>
                                    Post
                                </Button>
                            </ModalFooter>
                        </Box>
                    </ModalContent>
                </Modal>
            </>
        );
    } else {
        return (
            <Button onClick={()=>onOpen()} bg={kSecondaryBlueLight}isDisabled={true}>Post Reccomendation</Button>
        );
    }
    }   
}

export {
    ReccomendationPost,
    ReccomendationButton
} 