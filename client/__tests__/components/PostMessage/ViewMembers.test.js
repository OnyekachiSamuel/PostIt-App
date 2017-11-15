import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import { MemoryRouter } from 'react-router';
import { ViewMembers, mapStateToProps } from '../../../components/PostMessage/ViewMembersModal.jsx';
import { mockData } from '../../../__mocks__/mockData';

describe('<ViewMembers />', () => {
  beforeEach(() => {
    const setup = () => {
      return mapStateToProps(mockData.viewMembers.state);
    };
    const state = setup();
  });

  it('Component should render correctly', () => {
    const wrapper = shallow(<ViewMembers { ...mockData.viewMembers.props } />);
    const tree = toJson(wrapper);
    expect(tree.type).toBe('div');
    expect(tree.props.className).toEqual('row modal');
    expect(tree.children[0].type).toEqual('div');
  });

  it('should call componentDidMount', () => {
    sinon.spy(ViewMembers.prototype, 'componentDidMount');
    const wrapper = mount(
      <MemoryRouter>
        <ViewMembers {...mockData.viewMembers.props } />
      </MemoryRouter>);
    expect(ViewMembers.prototype.componentDidMount.calledOnce).toBe(true);
  });
});

