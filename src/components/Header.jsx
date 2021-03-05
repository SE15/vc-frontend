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
} from "@chakra-ui/react"
import { Search2Icon, BellIcon, SettingsIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { React, useState } from 'react'
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import ConnectionRequest from '../components/Connection/ConnectionRequest';


function Header({ isAuthenticated, logout }) {

    return (
        <>
            <Grid templateColumns="repeat(12, 1fr)" bg="purple.700" w="100%" gap={2} align="center" py={2} px={1} borderBottomRadius="2rem" position="fixed" top={0} zIndex={1}>
                <GridItem colSpan={3} onClick={console.log('hello')}>
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
                        <Input type="search" placeholder="Search" color="white" />
                        <Link as={ReactRouterLink} to="/search">
                            <IconButton aria-label="Search database" icon={<Search2Icon />} bg="blueGreen.400" color="white" />
                        </Link>
                        <Link />
                    </InputGroup>
                </GridItem>
                {isAuthenticated && <GridItem colStart={11} colEnd={13} color="white">
                    <HStack justifyContent="center">
                        <HStack spacing={-3}>
                            <NotificationPopover>
                                <IconButton icon={<BellIcon />} bg="blueGreen.200" color="white" />
                            </NotificationPopover>
                            <Badge borderRadius="lg" variant="solid" colorScheme="red" zIndex={1}> 3 </Badge>
                        </HStack >
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
    return (
        <Popover>
            <PopoverTrigger>
                {props.children}
            </PopoverTrigger>
            <Portal>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverHeader fontWeight={600}>Connection Requests</PopoverHeader>
                    <PopoverCloseButton />
                    <PopoverBody align="center">
                        <VStack w="100%" spacing={3}>
                            <ConnectionRequest name="Kumar Sangakkara" />
                            <ConnectionRequest name="Mahela Jayawardena" />
                            <ConnectionRequest name="Angelo Mathews" />
                        </VStack>
                        {/* <Alert status="info" colorScheme="purple" borderRadius="1rem">
                            <AlertIcon />
                            You have no new connection requests
                        </Alert> */}

                    </PopoverBody>
                </PopoverContent>
            </Portal>
        </Popover>
    );
}

export default Header;