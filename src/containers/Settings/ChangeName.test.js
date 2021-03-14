import React from 'react';
import { act } from 'react-dom/test-utils';

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

//import { editUserProfile } from '../../api';

import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureMockStore from 'redux-mock-store';

configure({adapter: new Adapter()});
const mockStore = configureMockStore();


jest.mock('../../api', () => ({
    editUserProfile: (user, data) => {
        if ( user && data.method =='edit-info' && data.first_name!="" && data.last_name!="") {
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


    it('should cancel the event when submitted',async () => {
        wrapper = mount(<ChangeName />);
        let prevented = false;
        await act(async () => {
            await wrapper.find(Button).at(0).prop("onClick")(
                {
                    preventDefault: () => {
                        prevented = true;
                    },
                }
            );
        });
        wrapper.update();
        expect(prevented).toBe(true);
    });

    it("should change name when the user clicked the confirm button and update database and show success message", async () => {
        // const mockUpdateName = jest.fn();
        // wrapper = mount(
        //   <ChangeName
        //     updateName = {mockUpdateName}
        //     firstName="some-firstname"
        //     lastName="some-lastName"
        //     user={1}
        //   />
        // );
        // wrapper.find(Input).at(0).simulate('change', {
        //     target: {value: "first"}
        // });
        // wrapper.find(Input).at(1).simulate('change', {
        //     target: {value: "second"}
        // });
        // wrapper.update();

        // await act(async () => {
        //     await wrapper.find(Button).at(0).prop("onClick")(
        //         {
        //             preventDefault: jest.fn(),
        //         }
        //     );
        // });
        

        // expect(wrapper.find(toast).props().status).toEqual('success');
    });

    it("should call updateName redux function on success", async () => {
        const mockUpdateName = jest.fn();
        wrapper = mount(
          <ChangeName
            updateName = {mockUpdateName}
            firstName="some-firstname"
            lastName="some-lastName"
            user={1}
          />
        );
        wrapper.find(Input).at(0).simulate('change', {
            target: {value: "first"}
        });
        wrapper.find(Input).at(1).simulate('change', {
            target: {value: "second"}
        });
        wrapper.update();

        await act(async () => {
            await wrapper.find(Button).at(0).prop("onClick")(
                {
                    preventDefault: jest.fn(),
                }
            );
        });
        

        expect(mockUpdateName).toHaveBeenCalled();
    });

    it("should't updated database and should show error message when first name is empty, when press confirm", async () => {
        
    });

    it("should't updated database and should show error message when last name is empty, when press confirm", async () => {
        
    });

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

    it('should dispatch updateName of global store when name is updated', () => {

    });

});

