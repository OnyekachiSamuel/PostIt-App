import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { GroupModal } from '../../../components/CreateGroup/GroupModal.jsx';
import { mockData } from '../../../__mocks__/mockData';

describe('<GroupModal />', () => {
  it('Component should render correctly', () => {
    const wrapper = shallow(<GroupModal { ...mockData.groupModal.props } />);
    const tree = toJson(wrapper);
    expect(tree.type).toBe('div');
    expect(tree.props).toEqual({ className: 'modal', id: 'modal3' });
  });
  it('should call onChange method on change in input for group creation modal', () => {
    const wrapper = shallow(<GroupModal { ...mockData.groupModal.props } />);
    const input = wrapper.find('#groupName');
    input.simulate('change', mockData.groupModal.event);
    expect(wrapper.state().groupName).toEqual('Andela Team 08');
  });
  it('should call onSubmit function on click of create button', () => {
    const wrapper = shallow(<GroupModal {...mockData.groupModal.props } />);
    const btn = wrapper.find('#formData');
    btn.simulate('submit', mockData.groupModal.event);
    expect(wrapper.state().groupName).toEqual('');
  });
});

