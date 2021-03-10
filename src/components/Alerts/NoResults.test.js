import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import NoResults from './NoResults';

configure({ adapter: new Adapter() });

test('NoResults Component should display message when provided', () => {
    const wrapper = shallow(<NoResults message='some-message'/>);
    expect(wrapper.text()).toContain('some-message');
});

