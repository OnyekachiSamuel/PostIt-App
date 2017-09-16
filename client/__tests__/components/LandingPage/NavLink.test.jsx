import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import NavLink from '../../../components/Index/NavLink.jsx';


describe('<NavLink />', () => {
  it('NavLink should render correctly ', () => {
    const wrapper = shallow(<NavLink />);
    const tree = toJson(wrapper);
    expect(tree.type).toBe('ul');
    expect(tree.props).toEqual({ id: 'nav-mobile', className: 'right' });
    expect(wrapper.hasClass('right')).toBe(true);
    expect(wrapper.prop('className')).toBe('right');
    expect(wrapper.contains('Sign Up')).toBe(true);
    expect(wrapper.contains('Sign In')).toBe(true);
  });
});
