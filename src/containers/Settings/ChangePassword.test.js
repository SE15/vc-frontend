import {
    Box,
    FormControl,
    Input,
    useToast
} from '@chakra-ui/react';
import { act } from 'react-dom/test-utils';
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



jest.mock('../../api', () => ({
    editUserProfile: (user, data) => {
        if ( user && data.method =='change-password' && data.oldPass!="" && data.newPass!="") {
            return {
                data: true
            }
        }else{
            return { 
                message: "some-error" 
            };
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

    it('should cancel the event when submitted',async () => {
        // wrapper = mount(<ChangePassword />);
        // let prevented = false;

        // await act(async () => {
        //     await wrapper.find(Button).at(0).prop("onClick")(
        //         {
        //             preventDefault: () => {
        //                 prevented = true;
        //             },
        //         }
        //     );
        // });
        // wrapper.update();
        // expect(prevented).toBe(true);
    });

    it("should change password when the user clicked the confirm button and update database and show success message", async () => {

        // wrapper = mount(
        //   <ChangePassword
        //     user={1}
        //   />
        // );
        // wrapper.setState({password:"password"})
        // wrapper.find(Input).at(2).simulate('change', {
        //     target: {value: "password"}
        // });
        // wrapper.update();

        // await act(async () => {
        //     await wrapper.find(Button).at(0).prop("onClick")(
        //         {
        //             preventDefault: jest.fn(),
        //         }
        //     );
        // });
        

        // expect(wrapper.state().confirmPassword).toEqual('');
    });

    it("should't change password and show error message when currunt password is incorrect, when press confirm", async () => {
        
    });

    it('should pass logged in user\'s id', () => {

        const initState = {
            user: 1,
        }
        store = mockStore(initState);
        wrapper = shallow(<ReduxConnections store={store} />).dive();

        expect(wrapper.props().user).toBe(1);
    });

    
});