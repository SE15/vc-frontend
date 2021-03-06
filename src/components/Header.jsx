import {
    Input, Heading, InputGroup, InputLeftElement, Box, Grid, GridItem,
    HStack, IconButton, Spacer, Button, Image, Container,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    Alert,
    AlertIcon,
    Badge,
    PopoverArrow,
    PopoverCloseButton,
    Portal,
    ReactRouterLink,
    VStack,
    useToast
} from "@chakra-ui/react"
import { Search2Icon, BellIcon, SettingsIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { React, useState } from 'react'
import logo from '../assets/logo.png';
import { Link, useHistory } from 'react-router-dom';
import ConnectionRequest from '../components/Connection/ConnectionRequest';


function Header({ isAuthenticated, logout }) {
    const history = useHistory();
    const [keyword, setKeyword] = useState('');

    const handleChange = (e) => {
        let textField = e.target.value;
        setKeyword(textField);
        console.log(keyword);
    }

    return (
        <>
            <Grid templateColumns="repeat(12, 1fr)" bg="purple.700" w="100%" gap={2} align="center" py={2} px={1} borderBottomRadius="2rem" position="fixed" top={0} zIndex={1}>
                <GridItem colSpan={3}>
                    <Link as={ReactRouterLink} to="/">
                        <HStack color="white">
                            <Image
                                src={logo}
                                htmlWidth="60px"
                            />
                            <Heading size="md" >
                                <a href="/">Volunteer Circle</a>
                            </Heading>
                        </HStack>
                    </Link>
                </GridItem>
                <GridItem colStart={5} colEnd={9}>
                    <InputGroup pt={1}>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<Search2Icon color="white.100" />}
                            pt={2}
                        />
                        <Input
                            type="search"
                            placeholder="Search"
                            color="white"
                            isRequired
                            onChange={handleChange.bind(this)}
                            value={keyword} />
                        <IconButton aria-label="Search database" icon={<Search2Icon />} onClick={() => {history.push('/'); history.push(`/search/${keyword}`, { keyword: keyword })}} bg="blueGreen.400" color="white" />
                        <Link />
                    </InputGroup>
                </GridItem>
                {isAuthenticated && <GridItem colStart={11} colEnd={13} color="white">
                    <HStack justifyContent="center">
                        <NotificationPopover />
                        <Link as={ReactRouterLink} to="/settings">
                            <IconButton icon={<SettingsIcon />} bg="blueGreen.200" color="white" />
                        </Link>
                        <Link as={ReactRouterLink} to="/">
                            <Button variant="ghost" leftIcon={<ArrowForwardIcon />} pb={1} onClick={logout}> Sign Out</Button>
                        </Link>
                    </HStack>
                </GridItem>}
            </Grid>
            <Box h={16} />
        </>
    )
}

const NotificationPopover = (props) => {
    const [connections, setConnections] = useState([{ id: 1, name: 'Kumar Sangakkara' }, { id: 2, name: 'Mahela Jayawardena' }, { id: 3, name: 'Ashan Priyanjan' }]);
    const toast = useToast();

    const generateMessage = (isAccepted, name) =>
        toast({
            position: "bottom-left",
            title: `Request ${isAccepted ? 'accepted' : 'rejected'}`,
            description: `${isAccepted ? 'You are connected with ' + name : 'You have rejected ' + name}`,
            status: "success",
            duration: 7000,
            isClosable: true,
            htmlWidth: 200
        });

    const onClick = (isAccepted, obj) => () => {
        const connectionIndex = connections.findIndex(connection => {
            return connection.id === obj.id
        });

        const tempConnections = [...connections];

        if (connectionIndex > -1) {
            tempConnections.splice(connectionIndex, 1);
        }
        setConnections(tempConnections);
        generateMessage(isAccepted, obj.name);
    }

    return (
        <HStack spacing={-3}>
            <Popover>
                <PopoverTrigger>
                    <IconButton icon={<BellIcon />} bg="blueGreen.200" color="white" />
                </PopoverTrigger>
                <Portal>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverHeader fontWeight={600}>Connection Requests</PopoverHeader>
                        <PopoverCloseButton />
                        <PopoverBody align="center">
                            {connections.length === 0 ?
                                <Alert status="info" colorScheme="purple" borderRadius="1rem" align="left">
                                    <AlertIcon />
                            You have no new connection requests
                            </Alert> :
                                <VStack w="100%" spacing={3} overflow="auto" h="270px">
                                    {connections.map((obj) =>
                                        <ConnectionRequest
                                            key={obj.id}
                                            name={obj.name}
                                            onAccept={onClick(true, obj)}
                                            onReject={onClick(false, obj)}
                                        />
                                    )}
                                </VStack>
                            }
                        </PopoverBody>
                    </PopoverContent>
                </Portal>
            </Popover>
            {connections.length !== 0 && <Badge borderRadius="lg" variant="solid" colorScheme="red" zIndex={1}> {connections.length} </Badge>}
        </HStack>
    );
}

export default Header;