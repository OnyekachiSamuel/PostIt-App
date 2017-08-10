import React from 'react';
import expect from 'expect';
import jasmineEnzyme from 'jasmine-enzyme';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jsdom-global/register';
// import { HomePage } from '../components/HomePage.jsx';
import { NavLink } from '../components/Index/NavLink.jsx';
import { SignInModal } from '../components/Index/SignInModal.jsx';


describe('HomePage components tests', () => {
  beforeEach(() => {
    jasmineEnzyme();
  });
  describe('<NavLink />', () => {
    it('should have link tag for signin and signup', () => {
      const component = shallow(<NavLink/>);
      const tree = toJson(component);
      expect(tree.type).toBe('ul');
      expect(tree.props).toBeTruthy({ id: 'nav-mobile', className: 'right' });
      expect(component.props().id).toBe('nav-mobile');
      expect(component.props().className).toBe('right');
      expect(component.contains('Sign Up')).toBe(true);
      expect(component.contains('Sign In')).toBe(true);
    });
  });
  describe('<SignInModal', () => {
    it('should have all required form inputs', () => {
      const component = shallow(<SignInModal />);
      console.log(component);
    });
  });
});
