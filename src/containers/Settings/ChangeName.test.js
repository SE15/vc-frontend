import React from 'react';

import {
    Box,
    FormControl,
    Input,
    useToast,
    Button
} from '@chakra-ui/react';
import { useState } from 'react';
import { ChangeName } from './ChangeName';
import GridComponent from '../../components/ContainerTemplates/GridComponent';
import ReduxConnections from "./ChangeName";

import { editUserProfile } from '../../api';

import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureMockStore from 'redux-mock-store';

configure({adapter: new Adapter()});
const mockStore = configureMockStore();


jest.mock('react-router-dom', () => ({
    editUserProfile: (user, data) => {
        if ( data.method =='edit-info' && data.first_name!="" && data.last_name!="") {
            return {
                data: true
            }
        }
    },
}));

describe('<ChangeName />', () => {
    let wrapper;
    let store;

    beforeEach(() => {
        wrapper = shallow(<ChangeName />);
    });

    it('should render', () => {
        expect(wrapper.exists()).toBeTruthy();
    });

    it('should render GridComponent', () => {
        wrapper = mount(<ChangeName />);
        expect(wrapper.children(GridComponent).length).toEqual(1);
    });

    it('should echo first name in text', () => {
        
        wrapper.find(Input).at(0).simulate('change', {
            target: {value: "first"}
        });

        expect(wrapper.find(Input).at(0).props().value).toEqual('first');
    });

    it('should echo last name in text', () => {
        
        wrapper.find(Input).at(1).simulate('change', {
            target: {value: "second"}
        });

        expect(wrapper.find(Input).at(1).props().value).toEqual('second');
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
            first_name: "some-firstname",
            last_name: "some-lastname",
        }
        store = mockStore(initState);
        wrapper = shallow(<ReduxConnections store={store} />).dive();

        expect(wrapper.props().user).toBe(1);
    });

    it('should pass logged in user\'s first name', () => {

        const initState = {
            user: 1,
            firstName: "some-firstname",
            lastName: "some-lastname",
        }
        store = mockStore(initState);
        wrapper = shallow(<ReduxConnections store={store} />).dive();

        expect(wrapper.props().firstName).toBe("some-firstname");
    });

    it('should pass logged in user\'s last name', () => {

        const initState = {
            user: 1,
            firstName: "some-firstname",
            lastName: "some-lastname",
        }
        store = mockStore(initState);
        wrapper = shallow(<ReduxConnections store={store} />).dive();

        expect(wrapper.props().lastName).toBe("some-lastname");
    });
});

