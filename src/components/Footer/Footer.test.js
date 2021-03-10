import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Footer from './Footer';

configure({ adapter: new Adapter() });

test('Footer Component should display developer team\'s name correctly', () => {
    const wrapper = shallow(<Footer />).at(1);
    expect(wrapper.text()).toContain('SE15');
});
