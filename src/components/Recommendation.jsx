import { React, useState } from "react"

import PropTypes from "prop-types"
import {
    Button, Modal, ModalOverlay, ModalContent, Image
    , ModalCloseButton, Text, useDisclosure, ModalFooter,
    Textarea, Avatar, Stack, Heading, Box, Divider, VStack
} from '@chakra-ui/react';

const Reccomendation = props => {
    return (
        <>
            <Box bg="white" w="90%" p={4} >
                <stack>
                    <Stack direction="row" align = "center">
                        if({props.postedImage}!=null){
                            <Image src={props.postedImage} size="30%" rounded="1rem" shadow="2xl" />
                        }
                                    else{
                            <Avatar name={props.postedBy} src="https://bit.ly/broken-link" />
                        }
                        <VStack>
                        <Heading color="gray.500" fontSize="md">
                            {props.postedBy}
                        </Heading>
                        <Text color="gray.900" fontSize="md" textAlign="left">
                        {props.recommendation}
                        </Text>
                        </VStack>
                        
                    </Stack>
                
                </stack>
            </Box>
        </>
    )
}
export default Reccomendation;