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

configure({ adapter: new Adapter() });
const mockStore = configureMockStore();

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
    // const skills = [
    //     {
    //       id: 1,
    //       name: "skill-name1",
    //       validations: 5,
    //     },
    //   ];

    // const initState = {
    //     isAuthenticated: true
    // }
    // store = mockStore(initState);
    
    // wrapper = shallow(<ReduxSkills store={store} skillList={skills}/>).dive();
    // //console.log(wrapper.props());
    // expect(wrapper.props().isAuthenticated).toBe(true);
  });

  //todo
  it("should call function on click of validate skill",()=>{
      // const valSkill= jest.fn();
      // const skills = [
      //   {
      //     id: 1,
      //     name: "skill-name1",
      //     validations: 5,
      //   },
      // ];
      // wrapper = mount(<Skills skillList={skills} isOwner={false} />);
      // wrapper.find(SkillCard).at(0).simulate('click');
      // expect(valSkill).toHaveBeenCalled();


  });
//todo
  it("should call function on click of delete skill",()=>{
    // const delSkill= jest.fn();
    // const skills = [
    //   {
    //     id: 1,
    //     name: "skill-name1",
    //     validations: 5,
    //   },
    // ];
    // wrapper = mount(<Skills skillList={skills} isOwner={true} />);
    // wrapper.find(SkillCard).at(0).simulate('click');
    // expect(delSkill).toHaveBeenCalled();


  });
//todo
  it('should open validate skill popup',()=>{

  });
//todo
  it('should open delete skill popup',()=>{

  });






});
