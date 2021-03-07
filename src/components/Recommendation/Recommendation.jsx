import { React } from "react"

import {
    Avatar,
    HStack,
    VStack,
    Text,
    StackDivider
} from '@chakra-ui/react';

const Recommendation = ({ author, description, image }) => {
    return (
        <HStack
            gap={4}
            w="100%"
            borderWidth="1px"
            borderRadius="lg"
            px={4}
            py={2}
            bg="purple.100"
            boxShadow="lg"
            align="top"
            spacing={3}
            minWidth="350px"
        >
            <Avatar name={author} size="md" src={image} />
            <VStack align="left">
                <Text color="gray.600" fontWeight="bold" align="left">{author}</Text>
                <StackDivider borderWidth="1px" borderColor="purple.200" />
                <Text>{description}</Text>
            </VStack>
        </HStack>
    )
}
export default Recommendation