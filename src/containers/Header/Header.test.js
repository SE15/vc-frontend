import {
    Input, Heading, InputGroup, InputLeftElement, Box, Grid, GridItem,
    HStack, IconButton, Button, Image,
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
import { getConnectionRequests, respondConnection } from '../../api';
import { React, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import ConnectionRequest from '../../components/Connection/ConnectionRequest';

import { Header } from './Header';
import ReduxConnections from "./Header";

import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureMockStore from 'redux-mock-store';

configure({adapter: new Adapter()});
const mockStore = configureMockStore();

const mockPush = jest.fn();

jest.mock('../../api', () => ({
    getConnectionRequests: (user) => {
        if (user) {
            return {
                data: "send connection list"
            }
        }
    },
}));

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: mockPush
    }),
}));

describe('<Header />', () => {
    let wrapper;
    let store;

    beforeEach(() => {
        // wrapper = shallow(<Header />);
    });

    it('should render', () => {
        // expect(wrapper.exists()).toBeTruthy();
    });

    it('should echo search keyword in text', () => {
        
        // wrapper.find(Input).at(0).simulate('change', {
        //     target: {value: "person_name"}
        // });

        // expect(wrapper.find(Input).at(0).props().value).toEqual('person_name');
    });

    it('should route to search onkeypress in input search bar', () => {

    });

    it('should route to search when search icon click', () => {

    });

    it('should show GridItem when isAuthenticated true', () => {

    });

    it('should get connection requests', () => {

    });

    it('should show NotificationPopover', () => {

    });

    it('should display \"You have no new connection requests\" message when provided with an empty array of connections', () => {

    });

    it("should display one connection when provided", () => {

    });

    it("should display two connections when provided", () => {

    });

    it("should display request accept success when click accept", () => {

    });

    it("should display request reject success when click reject", () => {

    });

    it("should display error when click accept and error occured", () => {

    });

    it("should display error when click reject and error occured", () => {

    });

    it('should pass logged in user\'s id', () => {

        const initState = {
            isAuthenticated: true,
            user: 1
        }
        store = mockStore(initState);
        wrapper = shallow(<ReduxConnections store={store} />).dive();

        expect(wrapper.props().user).toBe(1);
    });

    it('should pass logged in user\'s authentication status as true when token is not null or not undefined', () => {

        const initState = {
            token: "token",
            user: 1
        }
        store = mockStore(initState);
        wrapper = shallow(<ReduxConnections store={store} />).dive();

        expect(wrapper.props().isAuthenticated).toBe(true);
    });

    it('should pass logged in user\'s authentication status as false when token is null', () => {

        const initState = {
            token: null,
            user: 1
        }
        store = mockStore(initState);
        wrapper = shallow(<ReduxConnections store={store} />).dive();

        expect(wrapper.props().isAuthenticated).toBe(false);
    });

    it('should pass logged in user\'s authentication status as false when token is undefined', () => {

        const initState = {
            token: undefined,
            user: 1
        }
        store = mockStore(initState);
        wrapper = shallow(<ReduxConnections store={store} />).dive();

        expect(wrapper.props().isAuthenticated).toBe(false);
    });

    it('should dispatch onLogout of global store when profilePicture is updated', () => {

    });
    
});