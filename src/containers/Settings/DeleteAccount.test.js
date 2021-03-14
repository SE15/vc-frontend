import {
    VStack,
    Button,
    Heading,
    Text,
    StackDivider,
    Spacer,
    Alert,
    AlertIcon,
    useDisclosure,
    useToast
} from '@chakra-ui/react';

import { useState } from 'react';
import PopupWindow from '../../components/ContainerTemplates/PopupWindow';
import { DeleteAccount } from './DeleteAccount';
import ReduxConnections from "./DeleteAccount";

import { deleteUser } from '../../api';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureMockStore from 'redux-mock-store';

configure({adapter: new Adapter()});
const mockStore = configureMockStore();

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
    deleteUser: (user) => {
        if (user) {
            return {
                data: true
            }
        }
    },
    useHistory: () => ({
        push: mockPush
    }),
}));


describe('<DeleteAccount />', () => {
    let wrapper;
    let store;

    beforeEach(() => {
        wrapper = shallow(<DeleteAccount />);
    });

    it('should render', () => {
        expect(wrapper.exists()).toBeTruthy();
    });

    it('should route to home when user delete account', () => {
        wrapper.find(Button).at(0).prop('onClick')()

        expect(wrapper.children(PopupWindow).length).toEqual(1);
    });

    it("should delete account when the user clicked the confirm button and update database and show success message", async () => {

    });

    it("should call onLogout redux function on success, when confirm pressed", async () => {
        
    });

    it("should't delete account and show error message when deletion fails, when press confirm", async () => {
        
    });

    it('should pass logged in user\'s id', () => {

        const initState = {
            user: 1,
        }
        store = mockStore(initState);
        wrapper = shallow(<ReduxConnections store={store} />).dive();

        expect(wrapper.props().user).toBe(1);
    });

    it('should dispatch onLogout of global store when profilePicture is updated', () => {

    });
});

