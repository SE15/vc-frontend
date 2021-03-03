import React from 'react';

import {configure,mount,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer'

import Reccomendation from './Reccomendation'

configure({adapter:new Adapter()});

describe('<Reccomendation />',()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper =shallow(<Reccomendation postedBy="Anne De Mel" />);
    });

    it('should display name and reccomendation according to layout',()=>{
        wrapper.setProps({reccomendation:"A recommendation letter should always be sincere and honest. Do not exaggerate the person's qualifications"})
        expect(wrapper.getElements()).toMatchSnapshot();
    })
});    