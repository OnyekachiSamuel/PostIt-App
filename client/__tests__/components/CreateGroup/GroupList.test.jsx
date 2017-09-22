import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import { GroupList } from '../../../components/CreateGroup/GroupList.jsx';

const user = {
  user: {
    userId: 45
  }
};
const props = {
  fetchGroupRequest: jest.fn(),
  fetchUserGroupRequest: jest.fn(),
  groups: [],
  signin: user
};
describe('<GroupList />', () => {
  it('Component should render correctly', () => {
    const wrapper = shallow(<GroupList { ...props }/>);
    const tree = toJson(wrapper);
    expect(tree.type).toBe('div');
    expect(tree.props.className).toEqual('shift-left');
    expect(tree.children[0].type).toEqual('button');
  });
  describe('Component', () => {
    it('should call componentDidMount', () => {
      sinon.spy(GroupList.prototype, 'componentDidMount');
      const wrapper = mount(<GroupList {...props } />);
      expect(GroupList.prototype.componentDidMount.calledOnce).toBe(true);
      expect(wrapper.node.props.groups).toEqual([]);
    });
  });
});

