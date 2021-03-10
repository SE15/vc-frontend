import React from "react";

import { configure, shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import CardHolder from "./CardHolder";

import {
  VStack,
  Heading,
  Box,
  Button,
} from "@chakra-ui/react";

configure({ adapter: new Adapter() });

describe("CardHolder Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CardHolder heading="some-heading" />);
  });

  it("should display heading when provided", () => {
    expect(wrapper.find(Heading).prop("children")).toEqual("some-heading");
  });

  it("should display button when provided", () => {
    wrapper.setProps({ button: <Button id="1" /> });
    expect(wrapper.find(Button).prop("id")).toBe("1");
  });

  it("should display an empty box when button is not provided", () => {
    expect(wrapper.contains(<Box h="30px" />)).toBeTruthy();
  });

  describe("should display loader when isLoading is set", () => {
    beforeEach(() => {
      wrapper = mount(<CardHolder heading="some-heading" isLoading={true}/>);
    });

    it("and children are empty", () => {
      expect(wrapper.find(VStack).at(1).prop("children")).toMatchInlineSnapshot(
        `<Loader />`
      );
    });

    it("and children are not empty", () => {
      wrapper.setProps({ children: <div /> });
      expect(wrapper.find(VStack).at(1).prop("children")).toMatchInlineSnapshot(
        `<Loader />`
      );
    });
  });

  it("should display no results when children are empty and loading is not set", () => {
    wrapper = mount(<CardHolder heading="some-heading"/>);
    wrapper.setProps({ isLoading: false });
    expect(wrapper.find(VStack).at(1).prop("children")).toMatchInlineSnapshot(`
      <NoResults
        name="some-heading"
      />
    `);
  });

  it('should display children when provided and loading is not set', () => {
    wrapper.setProps({ isLoading: false, children: <div id="1" /> });
    expect(wrapper.find('div').prop('id')).toBe('1');
  }); 

});
