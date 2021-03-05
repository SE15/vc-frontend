import {
    VStack,
    Heading,
    StackDivider,
    Spacer,
    Button,
    Box,
    Skeleton,
    Alert,
    AlertIcon
} from '@chakra-ui/react';

import {
    AddIcon
} from '@chakra-ui/icons';

const CardHolder = (props) => {
    return (
        <Box h="420px" w="40%" borderWidth={3} borderRadius={8} boxShadow="lg" bg="white.200" borderColor="purple.100" px={5}>

            <VStack py={5} w="100%" h="100%" justify="center">
                <Heading size="md" color="purple.700">
                    {props.heading}
                </Heading>
                <StackDivider borderColor="purple.100" borderWidth={1} />
                <Spacer />
                <VStack h="75%" spacing={3} w="100%" overflowY="auto" py={2}>
                    {props.isLoading ? <Loader /> : props.children || <NoResults name={props.heading.toLowerCase()}/>}
                </VStack>
                <Spacer />
                <Button leftIcon={<AddIcon />} size="sm" variant="outline" colorScheme="purple">Add Skill</Button>
            </VStack>
        </Box>
    );
}

const Loader = () => {
    return ([
        <Skeleton>
            <Box w="350px" h="60px" borderWidth="1px" borderRadius="lg" />
        </Skeleton>,
        <Skeleton>
            <Box w="350px" h="60px" borderWidth="1px" borderRadius="lg" />
        </Skeleton>,
        <Skeleton>
            <Box w="350px" h="60px" borderWidth="1px" borderRadius="lg" />
        </Skeleton>
    ]);
}

const NoResults = ({name}) => {
    return (
        <Alert status="info" colorScheme="purple" borderRadius="1rem" h = "25%" minW="350px">
            <AlertIcon />
             There are no {name}
        </Alert>
    );
}

export default CardHolder;