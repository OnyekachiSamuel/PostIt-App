import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import { AddUser } from '../../../components/CreateGroup/AddUser.jsx';

const props = {
  fetchUsersRequest: jest.fn(),
  addUserRequest: jest.fn(),
  fetchGroupUsers: jest.fn(),
  users: ['Ken', 'Ben', 'Ken'],
  searchResult: {
    pageCount: 6,
    users: ['Samuel', 'Kachi', 'John']
  },
  userIds: [9, 10]
};
describe('<AddUser />', () => {
  it('Component should render correctly', () => {
    const wrapper = shallow(<AddUser { ...props }/>);
    const tree = toJson(wrapper);
    expect(tree.type).toBe('div');
    expect(tree.props.className).toBe('shift-right');
  });
  describe('Respond to change event', () => {
    it('should update the state on select of group', () => {
      const wrapper = shallow(<AddUser { ...props }/>);
      const event = {
        target: {
          name: 'groupId',
          value: '2',
        }
      };
      wrapper.instance().onChange(event);
      expect(wrapper.state().groupId).toEqual('2');
    });
  });
  describe('Respond to change event', () => {
    it('should update the state on select of a user', () => {
      const wrapper = shallow(<AddUser { ...props }/>);
      const event = {
        target: {
          name: 'usernames',
          value: 'Ben',
        }
      };
      wrapper.instance().onSelectUser(event);
      expect(wrapper.state().usernames).toEqual(['Ben']);
    });
  });
  describe('Test for onSubmit function', () => {
    it('should be called on button click', () => {
      const mockOnSubmit = sinon.spy(() => {});
      const wrapper = shallow(<AddUser onSubmit = { mockOnSubmit } {...props} />);
      const btn = wrapper.find('.btn');
      btn.simulate('click', mockOnSubmit());
      expect(btn.node.type).toBe('button');
      expect(btn.node.props.type).toBe('submit');
      expect(btn.node.props.className).toBe('input-group-addon btn');
      expect(btn.node.props.children).toBe('Add');
      expect(mockOnSubmit.calledOnce).toBe(true);
    });
  });
});

