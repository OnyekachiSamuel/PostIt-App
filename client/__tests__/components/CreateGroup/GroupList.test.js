import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import { MemoryRouter } from 'react-router';
import { GroupList, mapStateToProps } from '../../../components/CreateGroup/GroupList.jsx';
import { mockData } from '../../../__mocks__/mockData';

describe('<GroupList />', () => {
  beforeEach(() => {
    const setup = () => {
      return mapStateToProps(mockData.groupList.state);
    };
    const state = setup();
  });
  it('Component should render correctly', () => {
    const wrapper = shallow(<GroupList { ...mockData.groupList.props } />);
    const tree = toJson(wrapper);
    expect(tree.type).toBe('div');
    expect(tree.children[0].type).toEqual('div');
    expect(wrapper.contains('Create group')).toBe(true);
  });
  it('should call componentDidMount', () => {
    sinon.spy(GroupList.prototype, 'componentDidMount');
    const wrapper = mount(<MemoryRouter>
        <GroupList {...mockData.groupList.props } />
      </MemoryRouter>);
    expect(GroupList.prototype.componentDidMount.calledOnce).toBe(true);
  });
});

