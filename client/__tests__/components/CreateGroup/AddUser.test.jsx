import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { AddUser, mapStateToProps } from '../../../components/CreateGroup/AddUser.jsx';
import { mockData } from '../../../__mocks__/mockData';

describe('<AddUser />', () => {
  beforeEach(() => {
    const setup = () => {
      return mapStateToProps(mockData.addUser.state);
    };
    const state = setup();
    global.Materialize = { toast: () => { } };
  });
  it('Component should render correctly', () => {
    const wrapper = shallow(<AddUser { ...mockData.addUser.props } />);
    const tree = toJson(wrapper);
    expect(tree.type).toBe('div');
    expect(tree.props.className).toBe('shift-right');
  });
  it('should update the state on select of group', () => {
    const wrapper = shallow(<AddUser { ...mockData.addUser.props } />);
    wrapper.instance().onChange(mockData.addUser.event);
    wrapper.find('.browser-default').simulate('click');
    expect(wrapper.state('groupId')).toEqual('2');
  });
  it('should update the state on select of a user', () => {
    const wrapper = shallow(<AddUser { ...mockData.addUser.props } />);
    wrapper.setState({ paginatedUsers:
       mockData.addUser.props.searchResult.paginatedUsers });
    const input = wrapper.find('.ch-box');
    input.simulate('click', {
      target: {
        value: 'Sam'
      }
    });
    expect(wrapper.state().usernames).toEqual(['Sam']);
  });
  it('should call onSubmit function on button click', () => {
    const wrapper = shallow(<AddUser {...mockData.addUser.props} />);
    wrapper.setState({
      selected: true,
      paginatedUsers: mockData.addUser.props.searchResult.paginatedUsers
    });
    wrapper.setState({ usernames: ['John', 'Peter'], groupId: '9' });
    const btn = wrapper.find('#search-site');
    btn.simulate('submit', {
      preventDefault: () => {
      }
    });
    expect(wrapper.state().usernames).toEqual([]);
  });
});

