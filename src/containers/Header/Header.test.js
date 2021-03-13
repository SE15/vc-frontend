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

jest.mock('react-router-dom', () => ({
    getConnectionRequests: (user) => {
        if (user) {
            return {
                data: "send connection list"
            }
        }
    },
    useHistory: () => ({
        push: mockPush
    }),
}));

describe('<Header />', () => {
    let wrapper;
    let store;

    beforeEach(() => {
        wrapper = shallow(<Header />);
    });

    it('should render', () => {
        expect(wrapper.exists()).toBeTruthy();
    });

    it('should echo search keyword in text', () => {
        
        wrapper.find(Input).at(0).simulate('change', {
            target: {value: "person_name"}
        });

        expect(wrapper.find(Input).at(0).props().value).toEqual('person_name');
    });

    // it('should cancel the event when submitted', () => {
    //     wrapper = mount(<ChangeName submitHandler/>);
    //     let prevented = false;
    //     wrapper.find(Button).simulate("click", {
    //         preventDefault: () => {
    //             prevented = true;
    //         },
    //     });
    //     //wrapper.find(Button).prop('onClick')()
    //     expect(prevented).toBe(true);
    // });

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
});