import {React,useState,useRef, useEffect} from 'react'
import { Image, Button, Box, Heading } from '@chakra-ui/react';
import PropTypes from "prop-types"
import { Spacer, Flex, HStack ,CircularProgress} from "@chakra-ui/react"
import { DeleteIcon,AddIcon} from '@chakra-ui/icons'
import {
    Modal, ModalOverlay, ModalContent
    , ModalCloseButton, Text, useDisclosure, ModalFooter,
     Textarea, Avatar, Stack
} from '@chakra-ui/react';

 
import { kPrimaryBlack, kPrimaryBlackLight,kPrimaryGray, kSecondaryBlue, kSecondaryBlueDark, kSecondaryBlueLight } from './../../../utils/constants'

const AddSkillButton = props => {
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const onOpen = () => setIsOpen(true);
    const cancelRef = useRef();
    return(
    <>
         <Button colorScheme="green" onClick={onOpen}> + Add Skill
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} color="black.700" closeOnOverlayClick="false">
        <ModalOverlay />
        <ModalContent>
            <Box bg={kPrimaryBlackLight} w="100%" p={4} color="white">
                <stack>
                    <Heading color="black.400" fontSize="lg">
                        Add New Skill
    </Heading>
                    <br />
                    <Stack direction="row">
                    


                        
        
                            <Textarea placeholder="Enter new skill name" color="black.400" />
                        
                        <ModalCloseButton />
                    </Stack>
                </stack>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} >
                        Post
</Button>
                </ModalFooter>
            </Box>
        </ModalContent>

    </Modal>
    </>);
};

export default AddSkillButton;