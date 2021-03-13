import {
    Box,
    FormControl,
    Input,
    useToast
} from '@chakra-ui/react';
import React, { Component } from 'react';
import GridComponent from '../../components/ContainerTemplates/GridComponent';
import { ChangePassword } from './ChangePassword';
import ReduxConnections from "./ChangePassword";

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

describe('<ChangePassword />', () => {
    let wrapper;
    let store;

    beforeEach(() => {
        wrapper = shallow(<ChangePassword />);
    });

    it('should render', () => {
        expect(wrapper.exists()).toBeTruthy();
    });

    it('should render GridComponent', () => {
        
        expect(wrapper.children(GridComponent).length).toEqual(1);
    });

    it('should echo current password in text', () => {
        
        wrapper.find(Input).at(0).simulate('change', {
            target: {value: "current password"}
        });

        expect(wrapper.find(Input).at(0).props().value).toEqual('current password');
    });

    it('should echo New password in text', () => {
        
        wrapper.find(Input).at(1).simulate('change', {
            target: {value: "new password"}
        });

        expect(wrapper.find(Input).at(1).props().value).toEqual('new password');
    });

    it('should echo confirm password in text', () => {
        
        wrapper.find(Input).at(2).simulate('change', {
            target: {value: "confirm password"}
        });

        expect(wrapper.find(Input).at(2).props().value).toEqual('confirm password');
    });

    it('should change passwordConfirmed to true when confirmPassword === password and password is not empty when echoing confirm password', () => {
        wrapper.setState({password:"password"})
        wrapper.find(Input).at(2).simulate('change', {
            target: {value: "password"}
        });

        expect(wrapper.state().passwordConfirmed).toBe(true);
    });

    it('should change passwordConfirmed to false when confirmPassword != password when echoing confirm password', () => {
        wrapper.setState({password:"password"})
        wrapper.find(Input).at(2).simulate('change', {
            target: {value: "pass"}
        });

        expect(wrapper.state().passwordConfirmed).toBe(false);
    });

    it('should change focus border color to blue if password confirmed and password is empty', () => {
        wrapper.setState({passwordConfirmed:true, password:""});

        expect(wrapper.find(Input).at(2).props().focusBorderColor).toEqual('blue.400');
    });

    it('should change focus border color to green if password confirmed and password is not empty', () => {
        wrapper.setState({passwordConfirmed:true, password:"not empty"});

        expect(wrapper.find(Input).at(2).props().focusBorderColor).toEqual('green.400');
    });

    it('should change focus border color to red if password not confirmed', () => {
        wrapper.setState({passwordConfirmed:false, password:""});

        expect(wrapper.find(Input).at(2).props().focusBorderColor).toEqual('red.400');
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