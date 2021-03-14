import React from "react";

import { configure, shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import configureMockStore from 'redux-mock-store';

import {Connections} from "./Connections";
import ReduxConnections from "./Connections";

import CardHolder from "../../components/ContainerTemplates/CardHolder";
import NoResults from "../../components/Alerts/NoResults";

configure({ adapter: new Adapter() });
const mockStore = configureMockStore();

describe("Connections Container", () => {
    let wrapper;
    let store;

    it('should display no results when provided with an empty array of connections', () => {
        const connections = [];
        wrapper=mount(<Connections connectionList={connections}/>);
        expect(wrapper.find(NoResults)).toHaveLength(1);
    });

    it("should display one connection when provided", () => {
        const connections = [
            {
                id: 1,
                first_name: "some-firstname",
                last_name: "some-lastname",
                profile_pic: "some-image",
            },
        ];

        wrapper=mount(<Connections connectionList={connections}/>);
        expect(wrapper.find(CardHolder).prop('children')).toHaveLength(1);
    });

    
    it("should display two connections when provided", () => {
        const connections = [
            {
                id: 1,
                first_name: "some-firstname1",
                last_name: "some-lastname1",
                profile_pic: "some-image1",
            },
            {
                id: 2,
                first_name: "some-firstname2",
                last_name: "some-lastname2",
                profile_pic: "some-image2",
            }
        ];

        wrapper=mount(<Connections connectionList={connections}/>);
        expect(wrapper.find(CardHolder).prop('children')).toHaveLength(2);
    });

    it('should set loading prop when loading prop is set', () => {
        const connections = [
            {
                id: 1,
                first_name: "some-firstname",
                last_name: "some-lastname",
                profile_pic: "some-image",
            },
        ];

        wrapper=mount(<Connections connectionList={connections} loading={true}/>);
        expect(wrapper.find(CardHolder).prop('isLoading')).toBeTruthy();
    });

    it('should pass logged in user\'s id', () => {
        const connections = [
            {
                id: 1,
                first_name: "some-firstname",
                last_name: "some-lastname",
                profile_pic: "some-image",
            },
        ];

        const initState = {
            user: 1
        }
        store = mockStore(initState);
        wrapper = shallow(<ReduxConnections store={store} connectionList={connections}/>).dive();

        expect(wrapper.props().authUser).toBe(1);
    });
});
