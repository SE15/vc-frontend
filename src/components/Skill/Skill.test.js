import React from "react";

import { configure, shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import Skill from "./Skill";
import DeleteSkillPopup from "./DeleteSkillPopup";
import ValidateSkillPopup from "./ValidateSkillPopup";

import {
  Box,
  HStack,
  Text,
  IconButton,
  Tooltip,
  Spacer,
  useDisclosure,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

configure({ adapter: new Adapter() });

describe("Skill Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Skill onClick={jest.fn()} />);
  });

  it("should display number of validations when provided", () => {
    wrapper.setProps({ validations: 1 });
    expect(wrapper.find(Text).at(0).prop("children")).toBe(1);
  });

  it("should display skill name when provided", () => {
    wrapper.setProps({ name: "some-skill" });
    expect(wrapper.find(Text).at(1).prop("children")).toBe("some-skill");
  });

  it("should display delete skill button if the owner views the skill", () => {
    wrapper.setProps({ isOwner: true, isAuth: true });
    expect(wrapper.find(DeleteSkillPopup)).toHaveLength(1);
    expect(wrapper.find(ValidateSkillPopup)).toHaveLength(0);
  });

  it("should display validate skill button if another user views the skill", () => {
    wrapper.setProps({ isOwner: false, isAuth: true });
    expect(wrapper.find(DeleteSkillPopup)).toHaveLength(0);
    expect(wrapper.find(ValidateSkillPopup)).toHaveLength(1);
  });

  it('shouldn\'t display any button if a guest views the skill', () => {
    wrapper.setProps({ isAuth: false });
    expect(wrapper.find(DeleteSkillPopup)).toHaveLength(0);
    expect(wrapper.find(ValidateSkillPopup)).toHaveLength(0);
    expect(wrapper.contains(<Box w={10} />)).toBeTruthy();
  });
});
