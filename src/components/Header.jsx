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
import { Search2Icon, BellIcon, SettingsIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { getConnectionRequests, respondConnection } from '../api';
import { React, useState, useEffect } from 'react'
import logo from '../assets/logo.png';
import { Link, useHistory } from 'react-router-dom';
import ConnectionRequest from '../components/Connection/ConnectionRequest';

import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';


function Header({ isAuthenticated, onLogout, user }) {
    const history = useHistory();
    const [keyword, setKeyword] = useState('');

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
                            onChange={((e) => {setKeyword(e.target.value)}).bind(this)}
                            value={keyword} />
                        <IconButton aria-label="Search database" icon={<Search2Icon />} onClick={() => { history.push('/'); history.push(`/search/${keyword}`, { keyword: keyword }) }} bg="blueGreen.400" color="white" />
                        <Link />
                    </InputGroup>
                </GridItem>
                {isAuthenticated && <GridItem colStart={11} colEnd={13} color="white">
                    <HStack justifyContent="center">
                        <NotificationPopover user={user} isAuthenticated={isAuthenticated}/>
                        <Link as={ReactRouterLink} to="/settings">
                            <IconButton icon={<SettingsIcon />} bg="blueGreen.200" color="white" />
                        </Link>
                        <Link as={ReactRouterLink} to="/">
                            <Button variant="ghost" leftIcon={<ArrowForwardIcon />} pb={1} onClick={onLogout}> Sign Out</Button>
                        </Link>
                    </HStack>
                </GridItem>}
            </Grid>
            <Box h={16} />
        </>
    )
}

const NotificationPopover = ({ user, isAuthenticated }) => {
    const [connections, setConnections] = useState([]);
    const [loader, setLoader] = useState(0);
    const [loadingId, setLoadingId] = useState(null);

    const toast = useToast();

    const WAIT_TIME_MS = 20000;

    const updateConnections =  async () => {
        const results = await getConnectionRequests(user);
        if (results.data) 
            setConnections(results.data);
    }

    useEffect(() => {
        const interval = setInterval(updateConnections, WAIT_TIME_MS);

        return () => clearInterval(interval);
    }, []);

    useEffect(updateConnections, [isAuthenticated])

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

    const onClick = (isAccepted, obj) => async () => {
        setLoader(isAccepted ? 1 : 2);
        setLoadingId(obj.id);

        const data = {
            accept: isAccepted
        }

        const result = await respondConnection(user, obj.id, data);
        if (result.data) {
            const connectionIndex = connections.findIndex(connection => {
                return connection.id === obj.id
            });
    
            const tempConnections = [...connections];
    
            if (connectionIndex > -1) {
                tempConnections.splice(connectionIndex, 1);
            }
            setConnections(tempConnections);
            generateMessage(isAccepted, `${obj.first_name} ${obj.last_name}`);
        } else {
            toast({
                position: "bottom-left",
                title: `${result.title}`,
                description: `${result.message}`,
                status: "error",
                isClosable: true,
                htmlWidth: 200
            });
        }
        setLoader(0);
        setLoadingId(null);
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
                                            name={`${obj.first_name} ${obj.last_name}`}
                                            onAccept={onClick(true, obj)}
                                            onReject={onClick(false, obj)}
                                            user={obj.id}
                                            loader={loader}
                                            loadingId={loadingId}
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

const mapStateToProps = state => {
    return {
        isAuthenticated: !(state.token === null || state.token === undefined),
        user: state.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (Header);