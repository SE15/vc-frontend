import { React, useState } from "react"

import PropTypes from "prop-types"
import {
    Button, Modal, ModalOverlay, ModalContent, Image
    , ModalCloseButton, Text, useDisclosure, ModalFooter,
     Textarea, Avatar, Stack, Heading, Box, Divider
} from '@chakra-ui/react';

const Reccomendation = props => {
    return (
        <>
             <Box bg="white.200" w="50%" p={4} color="white">
                            <stack>
                                
                                
                                <Stack direction="row">
                                    if({props.postedImage}!=null){
                                        <Image src={props.postedImage} size="100%" rounded="1rem" shadow="2xl" />
                                    }
                                    else{
                                        <Avatar name={props.postedBy} src="https://bit.ly/broken-link" />
                                    }


                                    <Heading color="black.400" fontSize="lg">
                                                        {props.postedBy}
                                    </Heading>
                   
                                </Stack>
                                <Divider/>
                                <Text color="black.900" fontSize="md" textAlign="left">
                                    {props.reccomendation}
                                </Text>
                            </stack>
                            </Box>
        </>
    )
}
export default Reccomendation