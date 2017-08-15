import React from 'react';
import expect from 'expect';
import { shallow, mount } from 'enzyme';
// import { HomePage } from '../components/HomePage.jsx';
import { NavLink } from '../components/Index/NavLink.jsx';
import { SignInModal } from '../components/Index/SignInModal.jsx';

describe('<NavLink />', () => {
  it('renders 1 <NavLink /> component', () => {
    const component = shallow(<NavLink/>);
    expect(component.length).toBe(1);
  });
  it('renders props properly', () => {
    const component = shallow(<NavLink name="apps" />);
    expect(component.instance().props.name).toBe('apps');
    expect(component.props().id).toBe('nav-mobile');
    expect(component.props().className).toBe('right');
  });
  it('contains Sign Up and Sign In', () => {
    const component = shallow(<NavLink />);
    expect(component.contains('Sign Up')).toBe(true);
    expect(component.contains('Sign In')).toBe(true);
  });
});

// describe('<SignInModal />', () => {
//   const component = mount(<SignInModal {...props}/>);
//   console.log(component);
// });
