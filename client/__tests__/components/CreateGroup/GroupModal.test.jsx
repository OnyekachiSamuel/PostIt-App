import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { SelectGroup } from '../../../components/CreateGroup/GroupModal.jsx';
import { mockData } from '../../../__mocks__/mockData';

describe('<SelectGroup />', () => {
  it('Component should render correctly', () => {
    const wrapper = shallow(<SelectGroup { ...mockData.groupModal.props } />);
    const tree = toJson(wrapper);
    expect(tree.type).toBe('div');
    expect(tree.props).toEqual({ className: 'row modal', id: 'modal3' });
  });
  it('should call onChange method on SelectGroup', () => {
    const wrapper = shallow(<SelectGroup { ...mockData.groupModal.props } />);
    wrapper.instance().onChange(mockData.groupModal.event);
    expect(wrapper.state().groupName).toEqual('Andela Team 08');
    expect(wrapper.node.props.className).toEqual('row modal');
    expect(wrapper.node.props.id).toEqual('modal3');
  });
  it('should call onSubmit function on click of Add button', () => {
    const wrapper = shallow(<SelectGroup {...mockData.groupModal.props } />);
    wrapper.instance().onSubmit(mockData.groupModal.event);
    const btn = wrapper.find('.btn');
    btn.simulate('click');
    expect(wrapper.state().groupName).toEqual('');
  });
});

