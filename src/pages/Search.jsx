import { React, useState, useEffect, Redirect } from "react";
import { useLocation } from 'react-router-dom';
import {
    VStack,
    Text,
    Image,
    HStack,
    SkeletonCircle,
    Skeleton,
    Alert,
    AlertIcon,
    useToast
} from "@chakra-ui/react"
import { searchUsers } from '../api';
import Connection from '../components/Connection/Connection';

const Search = () => {
    const location = useLocation();
    const toast = useToast();

    const [loading, setLoading] = useState(true);
    const [networkError, setNetworkError] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [connections, setConnections] = useState([]);

    useEffect(async () => {
        if (!location.state) return <Redirect to='/' />;
        const keyword = location.state.keyword;
        const results = await searchUsers(keyword);
        if (results.data) {
            setConnections(results.data);
        } else {
            if (results.code === 1) {
                toast({
                    position: "bottom-left",
                    title: 'Network Error',
                    description: 'Please check your internet connection',
                    status: "error",
                    isClosable: true,
                    htmlWidth: 200
                });
                setNetworkError(true);
            } else {
                setNoResults(true);
            }
        }
        setLoading(false);
    }, [])

    let results = (
        <VStack w="40%" h="100%">
            <HStack spacing={1} wrap="wrap">
                <Text color="gray.700" fontWeight="bold" fontSize={18}>Search results for</Text>
                <Text color="purple.700" fontWeight="bold" fontSize={18}>{location.state.keyword}</Text>
            </HStack>
            <VStack w="100%" p={8} verticalAlign="center" alignContent="center" h={window.innerHeight / 1.4} borderWidth={3} borderRadius={8} VStackShadow="lg" bg="white.200" borderColor="purple.100" spacing={6} overflowX="hidden" overflowY="auto">
                {loading ? <LoadingScreen />
                    : networkError ? <NetworkError />
                        : noResults ? <NoResults />
                            : connections.map((obj =>
                                <Connection
                                    widthAuto
                                    name={`${obj.first_name} ${obj.last_name}`}
                                    user={obj.id}
                                    image={obj.profile_pic} />
                            ))}
            </VStack>
        </VStack>
    );
    return (
        <HStack spacing={20} pt={window.innerHeight / 25} px={window.innerWidth / 45} justify="center">
            <Image
                boxSize="20%"
                src="/signup-bg1.png"
            />
            {results}
            <Image
                boxSize="20%"
                src="/signup-bg2.png"
            />
        </HStack>
    );
}

const LoadingScreen = () => {
    return ([
        <HStack w="100%">
            <SkeletonCircle />
            <Skeleton height="36px" w="100%" />
        </HStack>,
        <HStack w="100%">
            <SkeletonCircle />
            <Skeleton height="36px" w="100%" />
        </HStack>,
        <HStack w="100%">
            <SkeletonCircle />
            <Skeleton height="36px" w="100%" />
        </HStack>,
        <HStack w="100%">
            <SkeletonCircle />
            <Skeleton height="36px" w="100%" />
        </HStack>,
        <HStack w="100%">
            <SkeletonCircle />
            <Skeleton height="36px" w="100%" />
        </HStack>,
        <HStack w="100%">
            <SkeletonCircle />
            <Skeleton height="36px" w="100%" />
        </HStack>
    ]);
}

const NoResults = () => {
    return (
        <Alert status="info" colorScheme="purple" borderRadius="1rem" h="25%">
            <AlertIcon />
             There are no users for the given name
        </Alert>
    );
}

const NetworkError = () => {
    return (
        <Alert status="warning" borderRadius="1rem" h="25%">
            <AlertIcon />
             Cannot connect to the server. Please check your internet connection
        </Alert>
    );
}



export default Search;