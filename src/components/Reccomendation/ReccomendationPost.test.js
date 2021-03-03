import React,{useState} from 'react';

import {configure,mount,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer'


import {ReccomendationButton,ReccomendationPost} from './ReccomendationPost'
import { Button, Modal } from '@chakra-ui/react';
import Reccomendation from './Reccomendation';

configure({adapter:new Adapter()});

describe('<ReccomendationPost />',()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper =shallow(<ReccomendationButton name="Anne De Mel"/>);
    });


    it('should set isreccomended true when reccomendation is posted',()=>{
        wrapper.setProps({visit: true});
        expect(wrapper.instance().state.isreccomended).toBe(false);
        wrapper.instance().handleReccomendation()
        expect(wrapper.instance().state.isreccomended).toBe(true);
    });

    it('should disable post reccomend button when not logged in',()=>{
        wrapper.setState({isLoggedIn: false});
        expect(wrapper.getElements()).toMatchSnapshot();
    });

    it('should disable post reccomend button when reccomendation is added',()=>{
        wrapper.setProps({visit: true});
        wrapper.instance().handleReccomendation();
        expect(wrapper.getElements()).toMatchSnapshot();
    });

    it('should disable post reccomend button when user viewing own profile',()=>{
        wrapper.setProps({visit: false});
        expect(wrapper.getElements()).toMatchSnapshot();
    });

    it('should display post reccomend button if its a profile visit & reccomendation not added before',()=>{
        wrapper.setProps({visit:true});
        wrapper.setState({isLoggedIn: true});
        expect(wrapper.getElements()).toMatchSnapshot();
    });

    it('should contain a modal',()=>{
        wrapper.setProps({visit:true});
        wrapper.setState({isLoggedIn: true});
        expect(wrapper.find(Modal)).toHaveLength(1);
    });

    it('should open a modal when button clicked',()=>{
        wrapper.setProps({visit:true});
        wrapper.setState({isLoggedIn: true});
        const wrap=wrapper.find(Button).at(0);
        //to implement
    });



});    