import React from "react";

import { configure, shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import DeleteSkillPopup from "./DeleteSkillPopup";
import PopupWindow from "../ContainerTemplates/PopupWindow";

import {
    Text,
    IconButton,
} from "@chakra-ui/react";

configure({ adapter: new Adapter() });

describe("DeleteSkillPopup Component", () => {
  let wrapper;
  const mockOnClick = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<DeleteSkillPopup onClick={mockOnClick}/>);
  });

  it('should display skill name when provided', () => {
      wrapper.setProps({name: 'some-name'});
      expect(wrapper.find(Text).at(1).prop('children')).toContain('some-name')
  });  
  
  it('should open the popup window on click', () => {
      wrapper.find(IconButton).prop('onClick')();
      expect(wrapper.find(PopupWindow).prop('isOpen')).toBeTruthy();
  });

  it('should display loading when isLoading is set', () => {
      wrapper.setProps({isLoading: true});
      expect(wrapper.find(PopupWindow).prop('isLoading')).toBeTruthy();
  });
  
});
