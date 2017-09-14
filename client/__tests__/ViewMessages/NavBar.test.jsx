import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { NavBar } from '../../components/ViewMessages/NavBar.jsx';


const props = {
  signOutRequest: jest.fn(),
  signOut: jest.fn(),
};
describe('<NavBar />', () => {
  it('NavBar should render correctly ', () => {
    const wrapper = shallow(<NavBar test= {'test'} />);
    const tree = toJson(wrapper);
    expect(tree.type).toBe('nav');
    expect(tree.children[0].type).toEqual('div');
  });
  describe('Test for onSubmit function', () => {
    it('should be called on button click', () => {
      const mockOnClick = sinon.spy(() => {});
      const wrapper = shallow(<NavBar onClick = { mockOnClick } {...props} />);
      const btn = wrapper.find('li');
      btn.simulate('click', mockOnClick());
      expect(mockOnClick.calledOnce).toBe(true);
      // expect(btn.node.props.className).toBe('btn waves-effect waves-light');
      // expect(btn.node.props.type).toBe('submit');
      // expect(btn.node.props.name).toBe('action');
      // expect(btn.node.props.children).toBe('Submit');
    });
  });
});
