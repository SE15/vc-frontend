import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import ProfileInfo from './ProfileInfo'

import {
    Skeleton,
    SkeletonCircle,
    Heading,
    Avatar
} from '@chakra-ui/react';

configure({ adapter: new Adapter() });

describe('ProfileInfo Component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<ProfileInfo />);
    });

    it('should display name when provided', () => {
        wrapper.setProps({ name: 'some-name' });
        expect(wrapper.find(Avatar).prop('name')).toEqual('some-name');
        expect(wrapper.find(Heading).prop('children')[1]).toEqual('some-name');
    });

    it('should display profile picture when provided', () => {
        wrapper.setProps({ profilePic: 'some-image' });
        expect(wrapper.find(Avatar).prop('src')).toEqual('some-image');
    });

    it('should display loading skeleton when isLoading is set', () => {
        wrapper.setProps({ isLoading: true });
        expect(wrapper.contains(<SkeletonCircle size="120px" />)).toBeTruthy();
        expect(wrapper.find(Skeleton).prop('isLoaded')).toBeFalsy();
    });

    it('should not display loading skeleton when isLoading is not set', () => {
        wrapper.setProps({ isLoading: false });
        expect(wrapper.contains(<SkeletonCircle size="120px" />)).toBeFalsy();
        expect(wrapper.find(Skeleton).prop('isLoaded')).toBeTruthy();
    });

});