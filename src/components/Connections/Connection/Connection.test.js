import React from 'react';

import {configure,render,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { screen } from '@testing-library/dom';
import Connection from './Connection';

configure({adapter:new Adapter()});

describe('<Connection />',()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper =shallow(<Connection cname="Anne De Mel" plink="https://www.test.com/"/>);
    });

    it('should match snapshot with correct name, image, link',()=>{
        expect(wrapper.getElements()).toMatchSnapshot();
    });

    it('should match snapshot with correct name, image, link for different connection name',()=>{
        wrapper.setProps({cname:"Emma Watson",plink:"https://www.emma.com/"});
        expect(wrapper.getElements()).toMatchSnapshot();
    });



});    