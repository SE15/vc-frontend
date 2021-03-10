import {
    VStack,
    Heading,
    StackDivider,
    Spacer,
    Button
} from '@chakra-ui/react';

const GridComponent = ({heading, children, isConfirm, onClick, loading, disabled}) => {
    return (
        <VStack py={5} w="100%" h="100%" justify="center">
            <Heading size="md" color="purple.700">
                {heading}
            </Heading>
            <StackDivider borderColor="purple.100" borderWidth={1} />
            <Spacer />
            <VStack spacing={3} w="100%">
                {children}
            </VStack>
            <Spacer />
            {isConfirm && <Button type="submit" colorScheme="green" w="40%" onClick={onClick} isLoading={loading} isDisabled={disabled}>Confirm</Button>}
        </VStack>
    );

}

export default GridComponent;