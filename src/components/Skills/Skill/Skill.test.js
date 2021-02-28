import React from 'react';
import { Button,AddIcon,DeleteIcon} from '@chakra-ui/icons';

import {configure,mount,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer'

import Skill from './Skill'

configure({adapter:new Adapter()});

describe('<Skill />',()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper =shallow(<Skill name='Anne De Mel' validations={5} />);
    });
    it('should set isValidated to true when validated',()=>{
        
        expect(wrapper.instance().state.isValidated).toBe(false);
        

        wrapper.instance().handleValidation()
        expect(wrapper.instance().state.isValidated).toBe(true);
       
    });

    it('should increase validations when validated',()=>{
        
        expect(wrapper.instance().state.validation).toBe(5);
        

        wrapper.instance().handleValidation()
        expect(wrapper.instance().state.validation).toBe(6);
       
    });
    
    it('should render red colour button if its not a visit by other user',()=>{
        wrapper.setProps({visit:false})
        expect(wrapper.getElements()).toMatchSnapshot();
    });
    
    it('should render blue colour button if its a visit by other user',()=>{
        wrapper.setProps({visit:true})
        expect(wrapper.getElements()).toMatchSnapshot();
    });

    it('should increase validations and disable add button when validated',()=>{
        wrapper.setProps({visit:true})
        wrapper.instance().handleValidation();
        expect(wrapper.getElements()).toMatchSnapshot();
    });

    it('should keep add button disabled if already validated',()=>{
        wrapper.setProps({visit:true})
        wrapper.setState({isValidated:true})
        expect(wrapper.getElements()).toMatchSnapshot();
    })

   
});