import React from "react";

import { configure, shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import configureMockStore from "redux-mock-store";

import { Recommendations } from "./Recommendations";
import ReduxRecommendations from "./Recommendations";

import Recommendation from "../../components/Recommendation/Recommendation";
import CardHolder from "../../components/ContainerTemplates/CardHolder";
import NoResults from "../../components/Alerts/NoResults";
import PopupWindow from "../../components/ContainerTemplates/PopupWindow";

import { Button, Textarea } from "@chakra-ui/react";

configure({ adapter: new Adapter() });
const mockStore = configureMockStore();

jest.mock("../../api", () => ({
  submitRecommendation: (user, description) => {
    if (user) return { data: true };
    else return { message: "some-error" };
  },
}));

describe("Recommendation Container", () => {
  let wrapper;
  let store;

  it("should display no results when provided with an empty array of recommendations", () => {
    const recommendations = [];
    wrapper = mount(<Recommendations recommendationList={recommendations} />);
    expect(wrapper.find(NoResults)).toHaveLength(1);
  });

  it("should display one recommendation when provided", () => {
    const recommendations = [
      {
        id: 1,
        image: "some-image",
        author: "some-firstname some-lastname",
        description: "some-description",
      },
    ];

    wrapper = mount(<Recommendations recommendationList={recommendations} />);
    expect(wrapper.find(Recommendation)).toHaveLength(1);
  });

  it("should display two recommendation when provided", () => {
    const recommendations = [
      {
        id: 1,
        image: "some-image1",
        author: "some-firstname1 some-lastname1",
        description: "some-description1",
      },
      {
        id: 2,
        image: "some-image2",
        author: "some-firstname2 some-lastname2",
        description: "some-description2",
      },
    ];

    wrapper = mount(<Recommendations recommendationList={recommendations} />);
    expect(wrapper.find(Recommendation)).toHaveLength(2);
  });

  it("should display post recommendation button for a non profile owner", () => {
    const recommendations = [];
    wrapper = mount(
      <Recommendations
        recommendationList={recommendations}
        isOwner={false}
        isAuthenticated={true}
      />
    );
    expect(wrapper.find(CardHolder).prop("button")).toMatchInlineSnapshot(`
      <Button
        colorScheme="purple"
        isDisabled={false}
        leftIcon={<EmailIcon />}
        onClick={[Function]}
        size="sm"
        variant="outline"
      >
        Post Recommendation
      </Button>
    `);
  });

  it("shouldn\'t display the post recommendation button for the profile owner", () => {
    const recommendations = [];
    wrapper = mount(
      <Recommendations
        recommendationList={recommendations}
        isOwner={true}
        isAuthenticated={true}
      />
    );
    expect(wrapper.find(CardHolder).prop("button")).toMatchInlineSnapshot(`
      <Box
        h="30px"
      />
    `);
  });

  it("should set loading prop when loading prop is set", () => {
    const recommendations = [
      {
        id: 1,
        image: "some-image1",
        author: "some-firstname1 some-lastname1",
        description: "some-description1",
      },
    ];

    wrapper = mount(
      <Recommendations recommendationList={recommendations} loading={true} />
    );
    expect(wrapper.find(CardHolder).prop("isLoading")).toBeTruthy();
  });

  it("should set description on change", () => {
    const recommendations = [];
    wrapper = shallow(<Recommendations recommendationList={recommendations} />);
    const eventObj = { target: { value: "some-description" } };
    expect(wrapper.find(Textarea).prop("value")).toEqual("");
    wrapper.find(Textarea).simulate("change", eventObj);
    wrapper.update();
    expect(wrapper.find(Textarea).prop("value")).toEqual("some-description");
  });

  it("should pass logged in user's id", () => {
    const recommendations = [
      {
        id: 1,
        image: "some-image1",
        author: "some-firstname1 some-lastname1",
        description: "some-description1",
      },
    ];

    const initState = {
      user: 1,
    };
    store = mockStore(initState);
    wrapper = shallow(
      <ReduxRecommendations
        store={store}
        recommendationList={recommendations}
      />
    ).dive();

    expect(wrapper.props().authUser).toBe(1);
  });

  it("should pass logged in user's first name and last name", () => {
    const recommendations = [
      {
        id: 1,
        image: "some-image1",
        author: "some-firstname1 some-lastname1",
        description: "some-description1",
      },
    ];

    const initState = {
      firstName: "some-firstname1",
      lastName: "some-lastname1",
    };
    store = mockStore(initState);
    wrapper = shallow(
      <ReduxRecommendations
        store={store}
        recommendationList={recommendations}
      />
    ).dive();

    expect(wrapper.props().firstName).toBe("some-firstname1");
    expect(wrapper.props().lastName).toBe("some-lastname1");
  });

  it("should pass logged in user's authentication status", () => {
    const recommendations = [
      {
        id: 1,
        image: "some-image1",
        author: "some-firstname1 some-lastname1",
        description: "some-description1",
      },
    ];

    const initState = {
      token: "some-token",
    };

    store = mockStore(initState);
    wrapper = shallow(
      <ReduxRecommendations
        store={store}
        recommendationList={recommendations}
      />
    ).dive();

    expect(wrapper.props().isAuthenticated).toBe(true);
  });

  it("should add recommendation when the user clicked the confirm button and updated database", async () => {
    const recommendations = [];

    wrapper = shallow(
      <Recommendations
        recommendationList={recommendations}
        firstName="some-firstname"
        lastName="some-lastName"
        profilePic="some-image"
        user={1}
      />
    );
    const eventObj = { target: { value: "some-description" } };
    wrapper.find(Textarea).simulate("change", eventObj);
    wrapper.update();

    await wrapper.find(PopupWindow).prop("onClick")();
    expect(wrapper.find(Recommendation)).toHaveLength(1);
  });

  it("shouldn't add recommendation when the user clicked the confirm button and didn't update the database", async () => {
    const recommendations = [];

    wrapper = shallow(<Recommendations recommendationList={recommendations} />);

    const eventObj = { target: { value: "some-description" } };
    wrapper.find(Textarea).simulate("change", eventObj);
    wrapper.update();

    await wrapper.find(PopupWindow).prop("onClick")();
    expect(wrapper.find(Recommendation)).toHaveLength(0);
  });

  it("should disable the post recommendation button when the logged in user already posted a recommendation before", () => {
    const recommendations = [
      {
        id: 1,
        image: "some-image",
        author: "some-firstname some-lastname",
        description: "some-description",
      },
    ];

    wrapper = mount(
      <Recommendations
        recommendationList={recommendations}
        authUser={1}
        loading={false}
        isOwner={false}
        isAuthenticated={true}
      />
    );

    expect(wrapper.find(CardHolder).prop("button")).toMatchInlineSnapshot(`
      <Button
        colorScheme="purple"
        isDisabled={true}
        leftIcon={<EmailIcon />}
        onClick={[Function]}
        size="sm"
        variant="outline"
      >
        Post Recommendation
      </Button>
    `);
  });

  it("should disable the post recommendation button when the logged in user posted a new recommendation", async () => {
    const recommendations = [];

    wrapper = shallow(
      <Recommendations
        recommendationList={recommendations}
        firstName="some-firstname"
        lastName="some-lastName"
        profilePic="some-image"
        user={2}
        authUser={1}
        loading={false}
        isOwner={false}
        isAuthenticated={true}
      />
    );
    const eventObj = { target: { value: "some-description" } };
    wrapper.find(Textarea).simulate("change", eventObj);
    wrapper.update();

    await wrapper.find(PopupWindow).prop("onClick")();

    expect(wrapper.find(CardHolder).prop("button")).toMatchInlineSnapshot(`
      <Button
        colorScheme="purple"
        isDisabled={true}
        leftIcon={<EmailIcon />}
        onClick={[Function]}
        size="sm"
        variant="outline"
      >
        Post Recommendation
      </Button>
    `);
  });
});
