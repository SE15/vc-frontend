import { React, useState } from "react"

import PropTypes from "prop-types"
import {
    Button, Modal, ModalOverlay, ModalContent, Image
    , ModalCloseButton, Text, useDisclosure, ModalFooter,
     Textarea, Avatar, Stack, Heading, Box
} from '@chakra-ui/react';
import { kPrimaryBlack, kPrimaryBlackLight,kPrimaryGray, kSecondaryBlue, kSecondaryBlueLight } from '../../utils/constants'


const AddSkill = props => {
    return (
        <>
            <AddSkillButton onClickAddSkill={props.onClickAddSkill}/>
        </>
    )
}


function AddSkillButton(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const onClickAddSkill = async (event, skill)=>{
        var s = event.target.value();
        setIsLoading(true);
        try{
            onClose();
            props.onClickAddSkill(s);
            setIsLoading(false);

        }catch{
            setIsLoading(false);
            setError("Couldn't add skill")
        }
    }

    return (
        <>
            <Box>
                <Button onClick={onOpen} bg={kSecondaryBlueLight}>Add Skill</Button>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose} color="black.700" closeOnOverlayClick="false">
                <ModalOverlay />
                <ModalContent>
                    <Box bg={kPrimaryBlackLight} w="100%" p={4} color="white">
                        <Stack>
                            <Heading color="black.400" fontSize="lg">
                                Add new Skill
                            </Heading>
                            <br />
                            <Stack direction="row">
                
                                <Textarea placeholder="Enter Recommendation" color="black.400" />
                                
                                <ModalCloseButton />
                            </Stack>
                        </Stack>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={()=> onClickAddSkill()}>
                                Add
                            </Button>
                        </ModalFooter>
                    </Box>
                </ModalContent>
            </Modal>
        </>
    );

}

AddSkill.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    visit: PropTypes.bool
}
AddSkill.defaultProps = {
    image: "null",
    visit: true
}
export default AddSkill;  

