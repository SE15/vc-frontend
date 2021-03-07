import {
    VStack,
    Heading,
    StackDivider,
    Spacer,
    Button
} from '@chakra-ui/react';

const GridComponent = (props) => {
    return (
        <VStack py={5} w="100%" h="100%" justify="center">
            <Heading size="md" color="purple.700">
                {props.heading}
            </Heading>
            <StackDivider borderColor="purple.100" borderWidth={1} />
            <Spacer />
            <VStack spacing={3} w="100%">
                {props.children}
            </VStack>
            <Spacer />
            {props.isConfirm && <Button type="submit" colorScheme="green" w="40%"> Confirm </Button>}
        </VStack>
    );

}

export default GridComponent;