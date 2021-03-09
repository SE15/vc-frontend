import {
    Alert,
    AlertIcon,
} from "@chakra-ui/react"

const NoResults = ({message}) => {
    return (
        <Alert status="info" colorScheme="purple" borderRadius="1rem" h="25%" w="100%" minWidth="350px">
            <AlertIcon />
            {message}
        </Alert>
    );
}

export default NoResults;