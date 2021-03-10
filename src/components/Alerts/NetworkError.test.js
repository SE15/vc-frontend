import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import NetworkError from './NetworkError';

configure({ adapter: new Adapter() });

test('NetworkError Component should display the error message correctly', () => {
    const wrapper = shallow(<NetworkError />);
    expect(wrapper.text()).toContain('Cannot connect to the server. Please check your internet connection');
});
