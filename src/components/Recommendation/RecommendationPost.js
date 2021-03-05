import { React, useState } from "react"

import PropTypes from "prop-types"
import {
    Button, Modal, ModalOverlay, ModalContent, Image
    , ModalCloseButton, Text, useDisclosure, ModalFooter,
     Textarea, Avatar, Stack, Heading, Box
} from '@chakra-ui/react';
import { kPrimaryBlackLight,kSecondaryBlueLight } from '../../constants';

const RecommendationPost = props => {
    return (
        <>
            <RecommendationButton visit={props.visit} name={props.name} />
        </>
    )
}


function RecommendationButton(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const[isreccomended,setIsReccomended]=useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleRecommendation= async event=>{
        setIsLoading(true);
        try{
            //wait for update validation in db
            setIsReccomended(true);
            setIsLoading(false);

        }catch{
            setIsReccomended(false);
            setIsLoading(false);
            setError("Couldn't Post Recommendation")
        }
    }
    if (props.visit == true && isLoggedIn == true && isreccomended==false) {

        return (
            <>
                <Box>
                    <Button onClick={onOpen} bg={kSecondaryBlueLight} isDisabled={false}>Post Recommendation</Button>
                </Box>
                <Modal isOpen={isOpen} onClose={onClose} color="black.700" closeOnOverlayClick="false">
                    <ModalOverlay />
                    <ModalContent>
                        <Box bg={kPrimaryBlackLight} w="100%" p={4} color="white">
                            <Stack>
                                <Heading color="black.400" fontSize="lg">
                                    Post Recommendation
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
                                        {props.name}
                                    </Text>
                   
                                    <Textarea placeholder="Enter Recommendation" color="black.400" />
                                    
                                    <ModalCloseButton />
                                </Stack>
                            </Stack>
                            <ModalFooter>
                                <Button colorScheme="blue" mr={3} onClick={()=>handleRecommendation()}>
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
            <Button onClick={onOpen} bg={kSecondaryBlueLight}isDisabled={true}>Post Recommendation</Button>
        );
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
