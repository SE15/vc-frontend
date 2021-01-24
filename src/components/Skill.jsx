
//import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { Spacer, Heading, Flex, Button, Box, HStack ,CircularProgress} from "@chakra-ui/react"
import { DeleteIcon,AddIcon} from '@chakra-ui/icons'
import {
    Modal, ModalOverlay, ModalContent, Image
    , ModalCloseButton, Text, useDisclosure, ModalFooter,
     Textarea, Avatar, Stack
} from '@chakra-ui/react';
import {
    AlertDialog,Badge,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay 
  } from "@chakra-ui/react"

import {React,useState,useRef, useEffect} from 'react' 
import axios from 'axios';
import { kPrimaryBlack, kPrimaryBlackLight,kPrimaryGray, kSecondaryBlue, kSecondaryBlueDark, kSecondaryBlueLight } from './../utils/constants'
const Skill=props=>{
    
    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const onOpen = () => setIsOpen(true)
    const cancelRef = useRef()
    const [name, setName] = useState(props.name);
    const [image, setimage]=useState(props.image)
    const [isLoading, setIsLoading] = useState(false);
    const [validations, setValidations]=useState(props.validations)
    const [skillname, setSkillname]=useState(props.skillname)
    
    const [error, setError] = useState('');

    const handleValidation= event=>{
        setIsLoading(true);
        try{
            const res=axios.put('api/users/skills/:id',{data:validations+1})
            setValidations(validations+1);
            setIsLoading(false);

        }catch{
            setValidations(validations);
            setIsLoading(false);
            setError("Couldn't validate skill")
        }
    }
    useEffect(()=>{
        handleValidation()
        console.log(validations)
    },[])

    
if(props.visit=="0"){
    
                
                    
    return (
        <>
        <Flex>
            <Box w="100%" p={4} bg={kPrimaryGray}>
                <HStack  spacing="3rem">
                        
                        
                    <Badge ml="1" fontSize="sm" colorScheme="blue" variant="outline" borderRadius="5rem">
                        {validations}
                    </Badge>
                          
                  
                          
                    <Heading size="sm" color={kSecondaryBlue}>{skillname}</Heading>
                    
                    <Spacer />
                
                   
                    <Button rightIcon={<DeleteIcon />} colorScheme="red"  onClick={() => setIsOpen(true)}></Button>
                  
                 
                
                        <AlertDialog
                                    isOpen={isOpen}
                                    leastDestructiveRef={cancelRef}
                                    onClose={onClose}
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
                            <Button colorScheme={kPrimaryBlack} ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={onClose} ml={3}>
                            
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
                    <Box w="100%" p={4} bg={kPrimaryGray}>
                        <HStack  spacing="3rem">
                        <Badge ml="1" fontSize="0.8em" colorScheme="blue" variant="outline" borderRadius="5rem">
                            {validations}
                            </Badge>
                          
                        <Heading size="sm" color={kSecondaryBlue}>{skillname}</Heading>
                    
                    <Spacer />
                
                    {isLoading ? (
                     
                     <CircularProgress isIndeterminate color="green.300"/>
                   
                ) :(
                   <>
                    <Button rightIcon={<AddIcon />} colorScheme="blue" onClick={onOpen} size="sm" isDisabled={false}>
                    </Button>
                    <Modal isOpen={isOpen} onClose={onClose} color="black.700" closeOnOverlayClick="false">
                    <ModalOverlay />
                    <ModalContent>
                        <Box bg={kPrimaryBlackLight} w="100%" p={4} color="white">
                            <stack>
                                <Heading color="black.400" fontSize="lg">
                                    Skill Validation
                </Heading>
                                <br />
                                <Stack direction="row">
                                {props.cimage!=null?(
                                    <Image src={props.image}  borderRadius="full" boxSize="3rem" />
                                
                                ) :(
                                    <Avatar name={props.name} src="https://bit.ly/broken-link" />
                                )
                                }


                                    <Text color={kSecondaryBlueLight}>
                                        {name}
                                    </Text>
                    if({props.visit}===true){
                                        <Textarea placeholder="Enter reason for skill Validation" color="black.400" />
                                    }
                                    <ModalCloseButton />
                                </Stack>
                            </stack>
                            <ModalFooter>
                                <Button colorScheme="blue" mr={3} onClick={()=> handleValidation()}>
                                    Post
            </Button>
                            </ModalFooter>
                        </Box>
                    </ModalContent>

                </Modal>
                </>
)}

                  
                 </HStack>
                    </Box>
                    </Flex>
                    </>
                
                  
                    
    
    );
}


}
Skill.propTypes = {
    skillname: PropTypes.string,
    validations:PropTypes.integer,
    visit:PropTypes.bool
  }
  Skill.defaultProps =   {
      
      visit:"1",
      validations:"0"
  }
  export default Skill