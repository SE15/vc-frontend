
//import { Link } from "react-router-dom"

import { Spacer, Heading, Flex, Button, Box, HStack ,CircularProgress} from "@chakra-ui/react";
import { DeleteIcon,AddIcon} from '@chakra-ui/icons';
// import {
//     Modal, ModalOverlay, ModalContent, Image
//     , ModalCloseButton, Text, ModalFooter,
//      Textarea, Avatar, Stack
// } from '@chakra-ui/react';
import {
    AlertDialog,Badge,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay 
} from "@chakra-ui/react";

import React, { Component } from 'react'

import axios from 'axios';
import { kPrimaryBlack, kPrimaryBlackLight,kPrimaryGray, kSecondaryBlue, kSecondaryBlueLight } from './../../../constants';


class Skill extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isValidated:false,
            key: props.key,
            isOpen: false,
            name: props.name,
            image: props.image,
            isLoading: false,
            validation: props.validations,
            skillname: props.skillname,
            error: ''
         };
    }

    onClose(){
        this.setState({
            ...this.state,
            isOpen: false
        }); 
    }
    onOpen(){
        this.setState({
            ...this.state,
            isOpen: true
        }); 
    }

    handleValidation= event=>{
        console.log(this.state.validation + 1)
        // this.setState({
        //     ...this.state,
        //     isLoading: true
        // });

        try{
            var validations = this.state.validation;
            //need to create correct api call
            //const res=axios.put('api/users/skills/:id',{validations})
            this.setState({
                ...this.state,
                validation: validations+1,
                isLoading: false,
                isValidated: true
            });

        }catch{
            this.setState({
                ...this.state,
                validation: this.validation,
                isLoading: false,
                error: "Couldn't validate skill"
            });
        }
    }

    deleteSkill = () => {
        if (this.state.skillname!=undefined) {
            console.log(this.state.skillname);
            this.onClose();
            this.props.onClick(this.props.skillname);
        }
    }

    cancelRef = React.createRef();

    render() {
        
        if(this.props.visit==false){             
            return (
                <>
                    <Flex>
                        <Box w="390px" p={4} bg={kPrimaryGray}>
                            <HStack  spacing="3rem">
                                    
                                <Badge ml="1" fontSize="lg" colorScheme="blue" variant="outline" borderRadius="5rem">
                                    {this.state.validation}
                                </Badge>
                                    
                                <Heading size="md" color={kSecondaryBlue}>{this.state.skillname}</Heading>
                                
                                <Spacer />
                            
                                <Button id="deleteBtn"rightIcon={<DeleteIcon />} colorScheme="red"  onClick={this.onOpen.bind(this)}></Button>
                            
                                <AlertDialog
                                    isOpen={this.state.isOpen}
                                    leastDestructiveRef={this.cancelRef}
                                    onClose={this.onClose.bind(this)}
                                >
                                    <AlertDialogOverlay>
                                    <AlertDialogContent>
                                        <Box bg={kPrimaryBlackLight} w="100%" p={4} color="white">
    
                                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                                Delete Skill
                                            </AlertDialogHeader>
    
                                            <AlertDialogBody>
                                                Are you sure? You can't undo this action afterwards.
                                            </AlertDialogBody>
    
                                            <AlertDialogFooter>
                                            
                                            <Button colorScheme={kPrimaryBlack} ref={this.cancelRef} onClick={this.onClose.bind(this)}>
                                                Cancel
                                            </Button>
                                            <Button colorScheme="red" onClick={this.deleteSkill.bind(this)} ml={3}>
                                                Delete
                                            </Button>
                                            </AlertDialogFooter>
    
                                        </Box>
    
                                    </AlertDialogContent>
                                    </AlertDialogOverlay>
                                </AlertDialog>
                            </HStack>
                        </Box>
                    </Flex>
                </>  
            );
        }else{
            return (
                <>
                    <Flex>
                        <Box w="390px" p={4} bg={kPrimaryGray}>
                            <HStack  spacing="3rem">
                                <Badge ml="1" fontSize="0.8em" colorScheme="blue" variant="outline" borderRadius="5rem">
                                    {this.state.validation}
                                </Badge>
                                
                                <Heading size="md" color={kSecondaryBlue}>{this.state.skillname}</Heading>
                            
                                <Spacer />
                        
                                {
                                    this.state.isLoading ? (
                                        <CircularProgress isIndeterminate color="green.300"/>
                        
                                    ) :(
                                        <>
                                            <Button id="addBtn" isDisabled={this.state.isValidated? true:false}  size="sm" rightIcon={<AddIcon />} colorScheme="blue" onClick={this.handleValidation.bind(this)}>
                                            </Button>
                                        </>
                                    )
                                }
                            </HStack>
                        </Box>
                    </Flex>
                </>            
            );
        }
    }
}

export default Skill;