import React from "react";

import { configure, shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import configureMockStore from "redux-mock-store";

import { Skills } from "./Skills";
import ReduxSkills from "./Skills";
import ReduxConnections from "./Connections";

import SkillCard from "../../components/Skill/Skill";
import CardHolder from "../../components/ContainerTemplates/CardHolder";
import NoResults from "../../components/Alerts/NoResults";
import PopupWindow from "../../components/ContainerTemplates/PopupWindow";
import { Button } from "@chakra-ui/button";


import {
    addSkill,
    deleteSkill,
    validateSkill
} from '../../api'
import Skill from "../../components/Skill/Skill";
import ValidateSkillPopup from "../../components/Skill/ValidateSkillPopup";
import { Children } from "react";
import { Input } from "@chakra-ui/input";

configure({ adapter: new Adapter() });
const mockStore = configureMockStore();

jest.mock("../../api", () => ({
  addSkill: (userId, name) => {
    if (userId) return { data: true };
    else return { message: "some-error" };
  },
  validateSkill: (userId, skillId) => {
    if (userId) return { skillId: true };
    else return { message: "some-error" };
  },
  deleteSkill: (userId, skillId) => {
    if (userId) return { skillId: true };
    else return { message: "some-error" };
  },
}));



describe("Skills container", () => {
  let wrapper;
  let store;

  it("should display no results when provided with an emplty array of skills", () => {
    const skills = [];
    wrapper = mount(<Skills skillList={skills} />);
    expect(wrapper.find(NoResults)).toHaveLength(1);
  });

  it("should display one skill when provided", () => {
    const skills = [
      {
        id: 1,
        name: "skill-name1",
        validations: 5,
      },
    ];

    wrapper = mount(<Skills skillList={skills} />);
    expect(wrapper.find(SkillCard)).toHaveLength(1);
  });

  it("should display two skills when provided", () => {
    const skills = [
      {
        id: 1,
        name: "skill-name1",
        validations: 5,
      },
      {
        id: 2,
        name: "skill-name2",
        validations: 6,
      },
    ];

    wrapper = mount(<Skills skillList={skills} />);
    expect(wrapper.find(SkillCard)).toHaveLength(2);
  });

  it("should display add skill button even there are no skills for profile owner", () => {
    const skills = [];
    wrapper = mount(<Skills skillList={skills} isOwner={true} />);

    expect(wrapper.find(CardHolder).prop("button")).toMatchInlineSnapshot(`
      <Button
        colorScheme="purple"
        leftIcon={<AddIcon />}
        onClick={[Function]}
        size="sm"
        variant="outline"
      >
        Add Skill
      </Button>
    `);
  });

  it("should display one add skill button even there are 2 skills for profile owner", () => {
    const skills = [
      {
        id: 1,
        name: "skill-name1",
        validations: 5,
      },
      {
        id: 2,
        name: "skill-name2",
        validations: 6,
      },
    ];

    wrapper = mount(<Skills skillList={skills} isOwner={true} />);

    expect(wrapper.find(CardHolder).prop("button")).toMatchInlineSnapshot(`
      <Button
        colorScheme="purple"
        leftIcon={<AddIcon />}
        onClick={[Function]}
        size="sm"
        variant="outline"
      >
        Add Skill
      </Button>
    `);
  });

  it("should display box for non profile owner", () => {
    const skills = [
      {
        id: 1,
        name: "skill-name1",
        validations: 5,
      },
      {
        id: 2,
        name: "skill-name2",
        validations: 6,
      },
    ];

    wrapper = mount(<Skills skillList={skills} isOwner={false} />);

    expect(wrapper.find(CardHolder).prop("button")).toMatchInlineSnapshot(`
      <Box
        h="30px"
      />
    `);
  });

  it("should set loading prop when loading prop is set", () => {
    const skills = [
      {
        id: 1,
        name: "skill-name1",
        validations: 5,
      },
    ];

    wrapper = mount(<Skills skillList={skills} loading={true} />);
    expect(wrapper.find(CardHolder).prop("isLoading")).toBeTruthy();
  });

  it('should pass logged in user\'s id', () => {
    const skills = [
        {
          id: 1,
          name: "skill-name1",
          validations: 5,
        },
      ];

    const initState = {
        user: 1
    }
    store = mockStore(initState);
    
    wrapper = shallow(<ReduxSkills store={store} skillList={skills}/>).dive();
    expect(wrapper.props().user).toBe(1);
  });



//fails? //todo
  it('should pass user authentication status', () => {
    const skills = [
        {
          id: 1,
          name: "skill-name1",
          validations: 5,
        },
      ];

    const initState = {
        token: "some-token",
    }
    store = mockStore(initState);
    
    wrapper = shallow(<ReduxSkills store={store} skillList={skills}/>).dive();
    expect(wrapper.props().isAuthenticated).toBe(true);
  });

  //todo
  it("should call function on click of validate skill",async ()=>{
      const valSkill= jest.fn();
      const skills = [
        {
          id: 1,
          name: "skill-name1",
          validations:5,
          alreadyValidated: false,
        },
      ];
      const eventObj= { target: {validations: 6}};
      wrapper = mount(<Skills skillList={skills} isOwner={false} isAuthenticated={true} />);
      wrapper.find(SkillCard).at(0).simulate('click', { target: {validations: 6}});
     

      await wrapper.find(ValidateSkillPopup).prop("onClick")();
      console.log(wrapper.find(SkillCard).props());
      expect(wrapper.find(SkillCard).at(0).prop("validations")).toEqual(5);


  });
//todo
  it("should call function on click of delete skill",()=>{
    const delSkill= jest.fn();
    const skills = [
      {
        id: 1,
        name: "skill-name1",
        validations: 5,
      },
    ];
    wrapper = mount(<Skills skillList={skills} isOwner={true} />);
    wrapper.find(SkillCard).at(0).simulate('click');
    


  });
//todo
  it('should open validate skill popup',()=>{
    const skills = [
      {
        id: 1,
        name: "skill-name1",
        validations:5,
        alreadyValidated: false,
      },
    ];
    const eventObj= { target: {validations: 6}};
    wrapper = mount(<Skills skillList={skills} isOwner={false} isAuthenticated={true} />);
    

  });
//todo
  it('should open delete skill popup',()=>{

  });

  it("should change skill name on change", async()=>{
    const skills=[];

    wrapper =shallow(
      <Skills skillList={skills} isAuthenticated={true} isOwner={true}/>
    );
    const eventObj={target:{value: "skill-name"}};
    wrapper.find(Input).simulate("change", eventObj);
    wrapper.update();
    expect(wrapper.find(Input).prop("value")).toEqual("skill-name");
  });

  it("should add skill when the user clicked the confirm button and updated database", async()=>{
    const skills=[
      {
        id: 1,
        name: "skill-name1",
        validations:5,
        alreadyValidated: false,
      },
    ];

    wrapper =shallow(
      <Skills skillList={skills} isAuthenticated={true} isOwner={true}/>
    );
    const eventObj={target:{value: "skill-name"}};
    wrapper.find(Input).simulate("change", eventObj);
    wrapper.update();
    expect(wrapper.find(Input).prop("value")).toEqual("skill-name");
    await wrapper.find(PopupWindow).prop("onClick")();
    expect(wrapper.find(Skill)).toHaveLength(1);
  });

  it("should not add skill when the user clicked the confirm button but not updated database", async()=>{
    const skills=[];

    wrapper =shallow(
      <Skills skillList={skills} isAuthenticated={true} isOwner={true}/>
    );
    const eventObj={target:{value: "skill-name"}};
    wrapper.find(Input).simulate("change", eventObj);
    wrapper.update();
    expect(wrapper.find(Input).prop("value")).toEqual("skill-name");
    await wrapper.find(PopupWindow).prop("onClick")();
    expect(wrapper.find(Skill)).toHaveLength(0);
  });

  it("should display validated in validation popup if skill has been already validated", ()=>{

  });

  it("should remove skill from container if deleted by user", ()=>{

  });

  it("should disable validate button if a user has validated a specific skill in that user profile", ()=>{

  });









});
