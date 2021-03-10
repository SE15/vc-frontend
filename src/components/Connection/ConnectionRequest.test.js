import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import ConnectionRequest from './ConnectionRequest'

import {
    Avatar,
    Button
} from "@chakra-ui/react"

configure({ adapter: new Adapter() });

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: mockPush
    }),
}));

describe('ConnectionRequest Component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<ConnectionRequest />);
    });

    it('should display name when provided', () => {
        wrapper.setProps({ name: 'some-name' });
        expect(wrapper.find(Avatar).prop('name')).toEqual('some-name');
        expect(wrapper.find(Button).at(0).prop('children')).toEqual('some-name');
    });

    it('should display image when provided', () => {
        wrapper.setProps({ image: 'some-image' });
        expect(wrapper.find(Avatar).prop('src')).toEqual('some-image');
    });

    it('should route to profile when the button is clicked', () => {
        wrapper.setProps({ name: 'some-name', user: 1 });
        wrapper.find(Button).at(0).prop('onClick')();

        expect(mockPush.mock.calls.pop()[0]).toBe('/profiles/some-name');
    });

    it('should invoke provided onAccept function on click', () => {
        const mockOnAccept = jest.fn();
        wrapper.setProps({onAccept: mockOnAccept});

        wrapper.find(Button).at(1).prop(`onClick`)();
        expect(mockOnAccept).toHaveBeenCalled();
    });
    
    it('should invoke provided onReject function on click', () => {
        const mockOnReject = jest.fn();
        wrapper.setProps({onReject: mockOnReject});

        wrapper.find(Button).at(2).prop(`onClick`)();
        expect(mockOnReject).toHaveBeenCalled();
    });

    it('should display loading on Accept button and disable Reject button if loader is 1 and loadingId is set to user', () => {
        wrapper.setProps({ user: 1, loader: 1, loadingId: 1 });

        expect(wrapper.find(Button).at(1).prop('isLoading')).toBeTruthy();
        expect(wrapper.find(Button).at(1).prop('isDisabled')).toBeFalsy();
        expect(wrapper.find(Button).at(2).prop('isLoading')).toBeFalsy();
        expect(wrapper.find(Button).at(2).prop('isDisabled')).toBeTruthy();
    });
    
    it('should display loading on Reject button and disable Accept button if loader is 2 and loadingId is set to user', () => {
        wrapper.setProps({ user: 1, loader: 2, loadingId: 1 });

        expect(wrapper.find(Button).at(1).prop('isLoading')).toBeFalsy();
        expect(wrapper.find(Button).at(1).prop('isDisabled')).toBeTruthy();
        expect(wrapper.find(Button).at(2).prop('isLoading')).toBeTruthy();
        expect(wrapper.find(Button).at(2).prop('isDisabled')).toBeFalsy();
    });   

    it('shouldn\'t change display of Accept and Reject buttons if loader is 1 and loadingId is not set to user', () => {
        wrapper.setProps({ user: 1, loader: 1, loadingId: 2 });

        expect(wrapper.find(Button).at(1).prop('isLoading')).toBeFalsy();
        expect(wrapper.find(Button).at(1).prop('isDisabled')).toBeFalsy();
        expect(wrapper.find(Button).at(2).prop('isLoading')).toBeFalsy();
        expect(wrapper.find(Button).at(2).prop('isDisabled')).toBeFalsy();
    });

    it('shouldn\'t change display of Accept and Reject buttons if loader is 2 and loadingId is not set to user', () => {
        wrapper.setProps({ user: 1, loader: 2, loadingId: 2 });

        expect(wrapper.find(Button).at(1).prop('isLoading')).toBeFalsy();
        expect(wrapper.find(Button).at(1).prop('isDisabled')).toBeFalsy();
        expect(wrapper.find(Button).at(2).prop('isLoading')).toBeFalsy();
        expect(wrapper.find(Button).at(2).prop('isDisabled')).toBeFalsy();
    });

});