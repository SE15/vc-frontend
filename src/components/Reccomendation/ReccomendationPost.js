import { React, useState } from "react"

import PropTypes from "prop-types"
import {
    Button, Modal, ModalOverlay, ModalContent, Image
    , ModalCloseButton, Text, useDisclosure, ModalFooter,
     Textarea, Avatar, Stack, Heading, Box
} from '@chakra-ui/react';
import { kPrimaryBlackLight,kSecondaryBlueLight } from './../../constants'
const ReccomendationPost = props => {
    return (
        <>
            <ReccomendationButton visit={props.visit} name={props.name} />
        </>
    )
}


function ReccomendationButton(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const[isreccomended,setIsReccomended]=useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleReccomendation= async event=>{
        setIsLoading(true);
        try{
            //wait for update validation in db
            setIsReccomended(true);
            setIsLoading(false);

        }catch{
            setIsReccomended(false);
            setIsLoading(false);
            setError("Couldn't Post Reccomendation")
        }
    }
    if (props.visit == true && isLoggedIn == true && isreccomended==false) {

        return (
            <>
                <Box>
                    <Button onClick={onOpen} bg={kSecondaryBlueLight} isDisabled={false}>Post Reccomendation</Button>
                </Box>
                <Modal isOpen={isOpen} onClose={onClose} color="black.700" closeOnOverlayClick="false">
                    <ModalOverlay />
                    <ModalContent>
                        <Box bg={kPrimaryBlackLight} w="100%" p={4} color="white">
                            <stack>
                                <Heading color="black.400" fontSize="lg">
                                    Post Reccomendation
                </Heading>
                                <br />
                                <Stack direction="row">
                                    {props.image}!=null)?
                                        <Image src={props.image} size="100%" rounded="1rem" shadow="2xl" />
                                    
                 
                                        :<Avatar name={props.name} src="https://bit.ly/broken-link" />
                                


                                    <Text color={kSecondaryBlueLight}>
                                        {props.name}
                                    </Text>
                   
                                        <Textarea placeholder="Enter reccomendation" color="black.400" />
                                    
                                    <ModalCloseButton />
                                </Stack>
                            </stack>
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
            <Button onClick={onOpen} bg={kSecondaryBlueLight}isDisabled={true}>Post Reccomendation</Button>
            );
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
