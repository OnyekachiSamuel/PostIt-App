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
    expect(wrapper.contains('select and add user(s) to a group')).toBe(true);
    expect(wrapper.contains('Select Group')).toBe(true);
  });
  it(`should call the onChange method and
   update the state with groupId on select of a group`, () => {
    const wrapper = shallow(<AddUser { ...mockData.addUser.props } />);
    const select = wrapper.find('#select');
    select.simulate('change', mockData.addUser.event);
    expect(wrapper.state('groupId')).toEqual('2');
  });
  it('should call onSelectUser method and update the state with selected users', () => {
    const wrapper = shallow(<AddUser { ...mockData.addUser.props } />);
    wrapper.setState({ paginatedUsers:
       mockData.addUser.props.searchResult.paginatedUsers,
      usernames: ['dan'] });
    const input = wrapper.find('.ch-box');
    input.simulate('click', {
      target: {
        value: 'Sam'
      }
    });
    expect(wrapper.state().usernames).toEqual(['dan', 'Sam']);
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
  it(`should call handleSearch function to update the state
   and dispatch action on typing into the search bar`, () => {
    const wrapper = shallow(<AddUser {...mockData.addUser.props} />);
    const input = wrapper.find('#search');
    input.simulate('change', {
      target: {
        name: 'search',
        value: 'samuel'
      }
    });
    expect(wrapper.state().search).toEqual('samuel');
  });
});

