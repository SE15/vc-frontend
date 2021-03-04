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
    PopoverArrow,
    PopoverCloseButton,
    Portal,
    ReactRouterLink,
} from "@chakra-ui/react"
import { Search2Icon, BellIcon, SettingsIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { React, useState } from 'react'
import { kPrimaryBlack, kSecondaryBlue } from '../utils/constants'
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';


function Header({isAuthenticated, logout}) {

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
                        <Link as={ReactRouterLink} to="/profile">
                            <IconButton aria-label="Search database" icon={<Search2Icon />} bg="blueGreen.400" color="white" />
                        </Link>
                        <Link/>
                    </InputGroup>
                </GridItem>
                {isAuthenticated && <GridItem colStart={11} colEnd={13} color="white">
                    <HStack justifyContent="center">
                        <NotificationPopover>
                            <IconButton icon={<BellIcon />} bg="blueGreen.200" color="white" />
                        </NotificationPopover>
                        <Link as={ReactRouterLink} to="/settings">
                            <IconButton icon={<SettingsIcon />} bg="blueGreen.200" color="white" />
                        </Link>
                        <Button variant="ghost" leftIcon={<ArrowForwardIcon />} pb={1} onClick={logout}> Sign Out</Button>
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
                    <PopoverBody>
                        <Alert status="info" colorScheme="purple" borderRadius="1rem">
                            <AlertIcon />
                            You have no new connection requests
                        </Alert>
                    </PopoverBody>
                </PopoverContent>
            </Portal>
        </Popover>
    );
}

export default Header;