import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Connection from './Connection'

import { Text, Avatar, HStack, Button } from "@chakra-ui/react"

configure({ adapter: new Adapter() });

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: mockPush
    }),
}));

describe('Connection Component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Connection />);
    });

    it('should display name when provided', () => {
        wrapper.setProps({ name: 'some-name' });
        expect(wrapper.find(Avatar).prop('name')).toEqual('some-name');
        expect(wrapper.find(Text).prop('children')).toEqual('some-name');
    });

    it('should display image when provided', () => {
        wrapper.setProps({ image: 'some-image' });
        expect(wrapper.find(Avatar).prop('src')).toEqual('some-image');
    });

    it('should set the width to 100% if widthAuto is true', () => {
        wrapper.setProps({ widthAuto: true });
        expect(wrapper.find(HStack).prop('width')).toBe('100%');
    });

    it('should set the width to 350px if widthAuto is false', () => {
        wrapper.setProps({ widthAuto: false });
        expect(wrapper.find(HStack).prop('width')).toBe('350px');
    });

    it('should route to home when name is the logged in user', () => {
        wrapper.setProps({ name: 'some-name', authUser: 1, user: 1 });
        wrapper.find(Button).prop('onClick')()

        expect(mockPush.mock.calls.pop()[0]).toBe('/');
    });

    it('should route to profile when name is not the logged in user', () => {
        wrapper.setProps({ name: 'some-name', authUser: 1, user: 2 });
        wrapper.find(Button).prop('onClick')()

        expect(mockPush.mock.calls.pop()[0]).toBe('/profiles/some-name');
    });

    it('should route to profile when a guest clicks', () => {
        wrapper.setProps({ name: 'some-name', user: 1 });
        wrapper.find(Button).prop('onClick')();

        expect(mockPush.mock.calls.pop()[0]).toBe('/profiles/some-name');
    });
});