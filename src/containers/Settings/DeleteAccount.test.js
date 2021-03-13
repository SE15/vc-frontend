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
            user: 1,
        }
        store = mockStore(initState);
        wrapper = shallow(<ReduxConnections store={store} />).dive();

        expect(wrapper.props().user).toBe(1);
    });
});

