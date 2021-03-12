import React from "react";

import { configure, shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import configureMockStore from 'redux-mock-store';

import {Recommendations} from "./Recommendations";
import ReduxRecommendations from "./Recommendations";

import Recommendation from '../../components/Recommendation/Recommendation';
import CardHolder from '../../components/ContainerTemplates/CardHolder';
import NoResults from '../../components/Alerts/NoResults';
import PopupWindow from '../../components/ContainerTemplates/PopupWindow';

import { submitRecommendation } from '../../api';

configure({ adapter: new Adapter() });
const mockStore = configureMockStore();

describe('Recommendation Container',()=>{
    let wrapper;
    let store;

    it('should display no results when provided with an empty array of recommendations', () => {
        const recommendations = [];
        wrapper=mount(<Recommendations recommendationList={recommendations}/>);
        expect(wrapper.find(NoResults)).toHaveLength(1);
    });

    it("should display one recommendation when provided", () => {
        const recommendations = [
            {
                key: 1,
                image: "some-image",
                author: "some-firstname some-lastname",
                description: "some-description",
            },
        ];

        wrapper=mount(<Recommendations recommendationList={recommendations}/>);
        expect(wrapper.find(Recommendation)).toHaveLength(1);
    });

    it("should display two recommendation when provided", () => {
        const recommendations = [
            {
                key: 1,
                image: "some-image1",
                author: "some-firstname1 some-lastname1",
                description: "some-description1",
            },
            {
                key: 2,
                image: "some-image2",
                author: "some-firstname2 some-lastname2",
                description: "some-description2",
            },
        ];

        wrapper=mount(<Recommendations recommendationList={recommendations}/>);
        expect(wrapper.find(Recommendation)).toHaveLength(2);
    });
//todo
    it('should display post recommendation button for a non profile owner',()=>{

    });
//todo
    it('should display box for a  profile owner',()=>{

    });
//todo
    it('should generate success toast if post reccomendation was a success',()=>{

    });
//todo
    it('should generate error toast if post reccomendation was a unsuccessful',()=>{

    });

    it('should set loading prop when loading prop is set', () => {
        const recommendations = [
            {
                key: 1,
                image: "some-image1",
                author: "some-firstname1 some-lastname1",
                description: "some-description1",
            },
        ];

        wrapper=mount(<Recommendations recommendationList={recommendations} loading={true}/>);
        expect(wrapper.find(CardHolder).prop('isLoading')).toBeTruthy();
    });
//todo
    it('should set description on change',()=>{

    });

    it('should pass logged in user\'s id', () => {
        const recommendations = [
            {
                key: 1,
                image: "some-image1",
                author: "some-firstname1 some-lastname1",
                description: "some-description1",
            },
        ];

        const initState = {
            user: 1
        }
        store = mockStore(initState);
        wrapper = shallow(<ReduxRecommendations store={store} recommendationList={recommendations}/>).dive();

        expect(wrapper.props().authUser).toBe(1);
    });

    it('should pass logged in user\'s first name and last name', () => {
        const recommendations = [
            {
                key: 1,
                image: "some-image1",
                author: "some-firstname1 some-lastname1",
                description: "some-description1",
            },
        ];

        const initState = {
            firstName: "some-firstname1",
            lastName:"some-lastname1" 
        }
        store = mockStore(initState);
        wrapper = shallow(<ReduxRecommendations store={store} recommendationList={recommendations}/>).dive();

        expect(wrapper.props().firstName).toBe("some-firstname1");
        expect(wrapper.props().lastName).toBe("some-lastname1");
    });
//todo
    it('should pass logged in user\'s authentication status', () => {
        const recommendations = [
            {
                key: 1,
                image: "some-image1",
                author: "some-firstname1 some-lastname1",
                description: "some-description1",
            },
        ];

        const initState = {
            isAuthenticated: true
        }
        store = mockStore(initState);
        wrapper = shallow(<ReduxRecommendations store={store} recommendationList={recommendations}/>).dive();

        expect(wrapper.props().isAuthenticated).toBe(true);
    });






})