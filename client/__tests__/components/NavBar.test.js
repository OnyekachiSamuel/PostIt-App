import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { NavBar, mapStateToProps } from '../../components/NavBar.jsx';
import { mockData } from '../../__mocks__/mockData';

describe('<NavBar />', () => {
  beforeEach(() => {
    const setup = () => {
      return mapStateToProps(mockData.navBar.state);
    };
    const state = setup();
  });

  it('NavBar should render correctly ', () => {
    const wrapper = shallow(<NavBar { ...mockData.navBar.props} />);
    const tree = toJson(wrapper);
    expect(tree.type).toBe('nav');
    expect(tree.children[0].type).toEqual('div');
    expect(wrapper.contains('Sign Out')).toBe(true);
  });

  it('should call onClick function on click of signOut button', () => {
    const wrapper = shallow(<NavBar {...mockData.navBar.props} />);
    const button = wrapper.find('#sign-btn');
    button.simulate('click');
    expect(wrapper.state().isLoggedOut).toBe(false);
  });
});
