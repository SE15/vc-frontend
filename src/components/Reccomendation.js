import {
    Button, Modal, ModalOverlay, ModalContent
    , ModalCloseButton, Text, useDisclosure, ModalFooter, Textarea
    , Avatar, Stack, Heading, Box
} from '@chakra-ui/react';
const Reccomendation = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button onClick={onOpen} bg="blueGreen.200">Post Reccomendation</Button>
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
                                <Avatar name="Oshigaki Kisame" src="https://bit.ly/broken-link" />

                                <Text color="blue.100">
                                    Oshisidj Kisksls
            </Text>

                                <Textarea placeholder="Enter reccomendation" color="black.400" />
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
    )
}
export default Reccomendation;