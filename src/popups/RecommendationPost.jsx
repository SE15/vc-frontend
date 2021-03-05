import { React, useState } from "react"

import PropTypes from "prop-types"
import {
    Button, Modal, ModalOverlay, ModalContent, Image
    , ModalCloseButton, Text, useDisclosure, ModalFooter,
     Textarea, Avatar, Stack, Heading, Box
} from '@chakra-ui/react';

const RecommendationPost = props => {
    return (
        <>
            <RecommendationButton visit={props.visit} name={props.name} />
        </>
    )
}


function RecommendationButton(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isUser, setUser] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure()
    if (props.visit == true && isLoggedIn == true) {

        return (
            <>
                <Box>
                    <Button onClick={onOpen} bg="blueGreen.200" isDisabled={false}>Post Recommendation</Button>
                </Box>
                <Modal isOpen={isOpen} onClose={onClose} color="black.700" closeOnOverlayClick="false">
                    <ModalOverlay />
                    <ModalContent>
                        <Box bg="white.200" w="100%" p={4} color="white">
                            <stack>
                                <Heading color="black.400" fontSize="lg">
                                    Post Recommendation
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
                                        <Textarea placeholder="Enter Recommendation" color="black.400" />
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
            <Button onClick={onOpen} bg="blueGreen.200" isDisabled={true}>Post Recommendation</Button>);
    }

}


RecommendationPost.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    visit: PropTypes.bool
}
RecommendationPost.defaultProps = {
    image: "null",
    visit: true
}
export default RecommendationPost  