import { React, useState } from "react"

import PropTypes from "prop-types"
import {
    Button, Modal, ModalOverlay, ModalContent, Image
    , ModalCloseButton, Text, useDisclosure, ModalFooter,
     Textarea, Avatar, Stack, Heading, Box
} from '@chakra-ui/react';

const ReccomendationPost = props => {
    return (
        <>
            <ReccomendationButton visit={props.visit} name={props.name} />
        </>
    )
}


function ReccomendationButton(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isUser, setUser] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure()
    if (props.visit == true && isLoggedIn == true) {

        return (
            <>
                <Box>
                    <Button onClick={onOpen} bg="blueGreen.200" isDisabled={false}>Post Reccomendation</Button>
                </Box>
                <Modal isOpen={isOpen} onClose={onClose} color="black.700" closeOnOverlayClick="false">
                    <ModalOverlay />
                    <ModalContent>
                        <Box bg="white.200" w="100%" p={4} color="white">
                            <stack>
                                <Heading color="black.400" fontSize="lg">
                                    Post Reccomendation
                </Heading>
                                <br />
                                <Stack direction="row">
                                    if({props.image}!=null){
                                        <Image src={props.image} size="100%" rounded="1rem" shadow="2xl" />
                                    }
                 else{
                                        <Avatar name={props.name} src="https://bit.ly/broken-link" />
                                    }


                                    <Text color="blue.100">
                                        {props.name}
                                    </Text>
                    if({props.visit}===true){
                                        <Textarea placeholder="Enter reccomendation" color="black.400" />
                                    }
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
            </>
        );
    } else {
        return (
            <Button onClick={onOpen} bg="blueGreen.200" isDisabled={true}>Post Reccomendation</Button>);
    }

}


ReccomendationPost.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    visit: PropTypes.bool
}
ReccomendationPost.defaultProps = {
    image: "null",
    visit: true
}
export default ReccomendationPost  