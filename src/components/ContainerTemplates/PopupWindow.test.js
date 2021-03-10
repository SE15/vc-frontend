import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import PopupWindow from "./PopupWindow";

import {
    Modal,
    ModalHeader,
    Button
} from '@chakra-ui/react';

configure({ adapter: new Adapter() });

describe("PopupWindow Component", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<PopupWindow isOpen="true"/>);
    });

    it('should display title when provided', () => {
        wrapper.setProps({title: 'some-title'});
        expect(wrapper.find(ModalHeader).prop("children")).toEqual("some-title");
    });

    it('should display button name when provided', () => {
        wrapper.setProps({buttonName: 'some-button'});
        expect(wrapper.find(Button).at(0).prop('children')).toBe('some-button');
    });

    it('should invoke provided onClick function on click', () => {
        const mockOnClick = jest.fn();
        wrapper.setProps({ onClick: mockOnClick });

        wrapper.find(Button).at(0).prop(`onClick`)();
        expect(mockOnClick).toHaveBeenCalled();
    });

    it('should display loading on provided button and disable the cancel when isLoading is set', () => {
        wrapper.setProps({isLoading: true});

        expect(wrapper.find(Button).at(0).prop('isLoading')).toBeTruthy();
        expect(wrapper.find(Button).at(1).prop('isDisabled')).toBeTruthy();
    });

    it('should disable the provided button when isDisabled is set', () => {
        wrapper.setProps({isDisabled: true});
        expect(wrapper.find(Button).at(0).prop('isDisabled')).toBeTruthy();
    });
    
    it('should display children when provided', () => {
        wrapper.setProps({ children: <div id='1' /> })
        expect(wrapper.find('div').prop('id')).toBe('1')
    });

    it('should close popup window when cancel is clicked given that onClose method is provided', () => {
        const mockOnClose = jest.fn(() => {wrapper.setProps({isOpen: false})});
        wrapper.setProps({onClose: mockOnClose});

        wrapper.find(Button).at(1).prop('onClick')();
        expect(wrapper.find(Modal).prop('isOpen')).toBeFalsy();
    });

});
