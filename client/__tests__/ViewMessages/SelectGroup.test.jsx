import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import { SelectGroup } from '../../components/ViewMessages/SelectGroup.jsx';
import localStorageMock from '../../__mocks__/localStorageMock';

window.localStorage = localStorageMock;
const props = {
  groups: ['Andela 23', 'Andela 32'],
  groupPost: {
    data: ['Testing it out', 'Testing']
  }
};
describe('<SelectGroup />', () => {
  it('Component should render correctly', () => {
    const wrapper = shallow(<SelectGroup { ...props }/>);
    const tree = toJson(wrapper);
    expect(tree.type).toBe('div');
    expect(tree.children[0].type).toEqual('div');
  });
  describe('<SelectGroup />', () => {
    it('calls componentDidMount', () => {
      sinon.spy(SelectGroup.prototype, 'componentDidMount');
      const wrapper = mount(<SelectGroup {...props } />);
      expect(SelectGroup.prototype.componentDidMount.calledOnce).toBe(true);
      expect(wrapper.node.state.groupId).toEqual('');
    });
  });
});

