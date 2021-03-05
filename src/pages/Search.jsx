import {
    VStack,
    Heading,
    Image,
    HStack,
    SkeletonCircle,
    Skeleton,
    Alert,
    AlertIcon
} from "@chakra-ui/react"

const Search = () => {
    let results = (
        <VStack p={8} w="40%" verticalAlign="center" alignContent="center" h={window.innerHeight / 1.4} borderWidth={3} borderRadius={8} VStackShadow="lg" bg="white.200" borderColor="purple.100" spacing={6}>
            <LoadingScreen />
            {/* <NoResults /> */}
        </VStack>);
    return (
        <HStack spacing={20} pt={window.innerHeight / 15} px={window.innerWidth / 45} justify="center">
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
        <HStack w="70%">
            <SkeletonCircle />
            <Skeleton height="36px" w="100%" />
        </HStack>,
        <HStack w="70%">
            <SkeletonCircle />
            <Skeleton height="36px" w="100%" />
        </HStack>,
        <HStack w="70%">
            <SkeletonCircle />
            <Skeleton height="36px" w="100%" />
        </HStack>,
        <HStack w="70%">
            <SkeletonCircle />
            <Skeleton height="36px" w="100%" />
        </HStack>,
        <HStack w="70%">
            <SkeletonCircle />
            <Skeleton height="36px" w="100%" />
        </HStack>,
        <HStack w="70%">
            <SkeletonCircle />
            <Skeleton height="36px" w="100%" />
        </HStack>
    ]);
}

const NoResults = () => {
    return (
        <Alert status="info" colorScheme="purple" borderRadius="1rem" h = "25%">
            <AlertIcon />
             There are no users for the given name
             </Alert>
    );
}



export default Search;