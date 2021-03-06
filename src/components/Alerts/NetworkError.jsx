import {
    Alert,
    AlertIcon,
} from "@chakra-ui/react"

const NetworkError = () => {
    return (
        <Alert status="warning" borderRadius="1rem" h="25%">
            <AlertIcon />
             Cannot connect to the server. Please check your internet connection
        </Alert>
    );
}

export default NetworkError;