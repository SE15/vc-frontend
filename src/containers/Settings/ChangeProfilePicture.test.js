import { useRef, useState } from 'react';
import {
    Button,
    Box,
    Stack,
    Avatar,
    Image,
    useToast
} from '@chakra-ui/react';
import GridComponent from '../../components/ContainerTemplates/GridComponent';
import { ChangeProfilePicture } from './ChangeProfilePicture';
import ReduxConnections from "./ChangeProfilePicture";

import { changeProfilePic } from '../../api';

import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureMockStore from 'redux-mock-store';

configure({adapter: new Adapter()});
const mockStore = configureMockStore();

jest.mock('../../api', () => ({
    changeProfilePic: (user, data) => {
        if ( data.method =='change-profile-pic' && data.picture!="") {
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

describe('<ChangeProfilePicture />', () => {
    let wrapper;
    let store;

    beforeEach(() => {
        wrapper = shallow(<ChangeProfilePicture />);
    });

    it('should render', () => {
        expect(wrapper.exists()).toBeTruthy();
    });

    it('should render GridComponent', () => {
        wrapper = mount(<ChangeProfilePicture />);
        expect(wrapper.children(GridComponent).length).toEqual(1);
    });

    it('should not show avatar and show image when isImageChanged true', () => {
        // wrapper.setState({isImageChanged:true});

        // expect(wrapper.find(Avatar).at(0).props().display).toEqual('none');
        // expect(wrapper.find(Image).at(0).props().display).toEqual('block');
    });

    it('should show avatar and not show image when isImageChanged false', () => {
        // wrapper.setState({isImageChanged:true});

        // expect(wrapper.find(Avatar).at(0).props().display).toEqual('block');
        // expect(wrapper.find(Image).at(0).props().display).toEqual('none');
    });

    it('should change isImageChanged to when image uploaded', () => {
        
        // wrapper.find('input').at(0).simulate('change', {
        //     target: {files: true, src: "pic.png"}
        // });

        // expect(wrapper.state().isImageChanged).toBe(true);
    });

    it("should change profile picture when the user clicked the confirm button and update database and show success message", async () => {

    });

    it("should't change profile picture and show error message when profile picture updatefails, when press confirm", async () => {
        
    });

    it('should pass logged in user\'s id', () => {

        const initState = {
            user: 1,
            firstName: "some-firstname",
            lastName: "some-lastname",
            profilePic: "pic.png"
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
            profilePic: "pic.png"
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
            profilePic: "pic.png"
        }
        store = mockStore(initState);
        wrapper = shallow(<ReduxConnections store={store} />).dive();

        expect(wrapper.props().lastName).toBe("some-lastname");
    });

    it('should pass logged in user\'s profilePic', () => {

        const initState = {
            user: 1,
            firstName: "some-firstname",
            lastName: "some-lastname",
            profilePic: "pic.png"
        }
        store = mockStore(initState);
        wrapper = shallow(<ReduxConnections store={store} />).dive();

        expect(wrapper.props().profilePic).toEqual("pic.png");
    });

    it('should dispatch updateProfilePicture of global store when profilePicture is updated', () => {

    });
});