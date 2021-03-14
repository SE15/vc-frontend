import React from "react";

import { configure, shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import configureMockStore from 'redux-mock-store';

import {ProfileContent, ConnectionButton} from "./ProfileContent";
import ReduxProfileContent from "./ProfileContent";

import PopupWindow from '../../components/ContainerTemplates/PopupWindow';
import Skills from './Skills';
import Recommendations from './Recommendations';
import Connections from './Connections';
import { connect } from 'react-redux';

import { getUser, getConnectionState, addConnection, deleteConnection } from '../../api';
import { Box, HStack, VStack } from "@chakra-ui/layout";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";

configure({ adapter: new Adapter() });
const mockStore = configureMockStore();


describe("profile container",()=>{
    let wrapper;
    let store;

    it('should display the 3 containers for skills, recommendations and connections',()=>{
        wrapper=shallow(<ProfileContent/>);
        expect(wrapper.find(HStack).prop('children')).toHaveLength(3);
    });

    it('should display profile info', ()=>{
        wrapper=shallow(<ProfileContent/>);
        expect(wrapper.find(ProfileInfo)).toHaveLength(1);
    });
//todo-err

    it('should display connect button if not a connection',()=>{
        // wrapper=shallow(<ProfileContent user={1} isAuthenticated={true} authUser={2}/>);
        // console.log(wrapper.find(VStack).childAt(1));
        // expect(wrapper.find(Box).childAt(1)).toMatchInlineSnapshot(
        //     `<Button leftIcon={<EmailIcon />} colorScheme="green" variant="outline" my={2} isLoading={loading} onClick={onSendRequest}>
        //     Send Request
        // </Button>`
        // )
    });

    it('should display remove connection button if it\'s a connection',()=>{

    });

    it('should display pending request button if connection request is sent',()=>{

    });

    it("should display profile cannot be loaded in a error",()=>{

    });

    it("should open popup window to confirm removing a connection",()=>{

    });

    it("should display toast in connection request",()=>{

    });



})