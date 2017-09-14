import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import { ViewMembers } from '../../components/PostMessage//ViewMembersModal.jsx';


const props = {
  fetchMembersRequest: jest.fn(),
  fetchMembers: []
};
describe('<ViewMembers />', () => {
  it('Component should render correctly', () => {
    const wrapper = shallow(<ViewMembers { ...props }/>);
    const tree = toJson(wrapper);
    expect(tree.type).toBe('div');
    expect(tree.props.className).toEqual('row modal');
    expect(tree.children[0].type).toEqual('div');
  });
});

