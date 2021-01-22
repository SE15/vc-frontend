import {  Heading, Flex, Avatar, Box, HStack ,Link} from "@chakra-ui/react"

function Connection() {


    return (
        <>
            <Flex>
                <Box w="20rem" p={4} bg="white.200">
                    <HStack  spacing="3rem">
                    <Avatar name="Oshigaki Kisame" src="https://bit.ly/broken-link" />
                    <Heading size="md" color="black.600">Full Name</Heading>
                    <Link color="blue.200" fontSize="md"href="#">
                        View
                    </Link>
            
                    </HStack>
                </Box>
            </Flex>

        </>
    )
}

export default Connection;
