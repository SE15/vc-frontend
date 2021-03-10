import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Recommendation from './Recommendation'

import {
    Avatar,
    Text,
    Button,
} from '@chakra-ui/react';

configure({ adapter: new Adapter() });

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: mockPush
    }),
}));

describe('Recommendation Component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Recommendation />);
    });

    it('should display author when provided', () => {
        wrapper.setProps({ author: 'some-author' });
        expect(wrapper.find(Avatar).prop('name')).toEqual('some-author');
        expect(wrapper.find(Text).at(0).prop('children')).toEqual('some-author');
    });

    it('should display description when provided', () => {
        wrapper.setProps({ description: 'some-description' });
        expect(wrapper.find(Text).at(1).prop('children')).toEqual('some-description');
    });

    it('should display image when provided', () => {
        wrapper.setProps({ image: 'some-image' });
        expect(wrapper.find(Avatar).prop('src')).toEqual('some-image');
    });

    it('should route to home when author is the logged in user', () => {
        wrapper.setProps({ authUser: 1, user: 1 });
        wrapper.find(Button).prop('onClick')()

        expect(mockPush.mock.calls.pop()[0]).toBe('/');
    });

    it('should route to profile when author is not the logged in user', () => {
        wrapper.setProps({ author: 'some-author', authUser: 1, user: 2 });
        wrapper.find(Button).prop('onClick')()

        expect(mockPush.mock.calls.pop()[0]).toBe('/profiles/some-author');
    });

    it('should route to profile when a guest clicks', () => {
        wrapper.setProps({ author: 'some-author', user: 1 });
        wrapper.find(Button).prop('onClick')();

        expect(mockPush.mock.calls.pop()[0]).toBe('/profiles/some-author');
    });
});