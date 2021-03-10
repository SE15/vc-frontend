import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import GridComponent from "./GridComponent";

import {
    Heading,
    Button
} from '@chakra-ui/react';

configure({ adapter: new Adapter() });

describe("GridComponent Component", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<GridComponent />);
    });

    it('should display heading when provided', () => {
        wrapper.setProps({heading: 'some-heading'});
        expect(wrapper.find(Heading).prop("children")).toEqual("some-heading");
    });

    it('should display children when provided', () => {
        wrapper.setProps({ children: <div id='1' /> })
        expect(wrapper.find('div').prop('id')).toBe('1')
    });

    it('should display confirm button when isConfirm is set', () => {
        wrapper.setProps({ isConfirm: true });
        expect(wrapper.find(Button).prop('children')).toBe('Confirm');
    });

    it('should invoke provided onClick function on click', () => {
        const mockOnClick = jest.fn();
        wrapper.setProps({ isConfirm: true, onClick: mockOnClick });

        wrapper.find(Button).prop(`onClick`)();
        expect(mockOnClick).toHaveBeenCalled();
    });

    it('should display loading on button when loading is set', () => {
        wrapper.setProps({ isConfirm: true, loading: true });
        expect(wrapper.find(Button).prop('isLoading')).toBeTruthy();
    });

    it('should disable the button when disabled is set', () => {
        wrapper.setProps({ isConfirm: true, disabled: true });
        expect(wrapper.find(Button).prop('isDisabled')).toBeTruthy();
    });

});
