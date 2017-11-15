import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import { SelectGroup, mapStateToProps } from '../../../components/ViewMessages/SelectGroup.jsx';
import { mockData } from '../../../__mocks__/mockData';
import localStorageMock from '../../../__mocks__/localStorageMock';

window.localStorage = localStorageMock;
describe('<SelectGroup />', () => {
  beforeEach(() => {
    const setup = () => {
      return mapStateToProps(mockData.selectGroup.state);
    };
    const state = setup();
  });

  it('Component should render correctly', () => {
    const wrapper = shallow(<SelectGroup { ...mockData.selectGroup.props } />);
    const tree = toJson(wrapper);
    expect(tree.type).toBe('div');
    expect(tree.children[0].type).toEqual('div');
  });

  it('should call componentDidMount', () => {
    sinon.spy(SelectGroup.prototype, 'componentDidMount');
    const wrapper = mount(<SelectGroup {...mockData.selectGroup.props } />);
    expect(SelectGroup.prototype.componentDidMount.calledOnce).toBe(true);
    expect(wrapper.node.state.groupId).toEqual('');
  });

  it('should call onChange event on the selection of group', () => {
    const wrapper = shallow(<SelectGroup { ...mockData.selectGroup.props } />);
    const btn = wrapper.find('.browser-default');
    btn.simulate('change', mockData.selectGroup.target);
    expect(wrapper.state().groupId).toEqual(23);
  });

  it('should call onClick function on the click of view button', () => {
    const wrapper = shallow(<SelectGroup { ...mockData.selectGroup.props } />);
    const btn = wrapper.find('.btn');
    wrapper.setState({ groupId: 6 });
    wrapper.setState({ posts: ['Testing it out', 'Testing'] });
    btn.simulate('click');
    expect(wrapper.state('posts')).toEqual(['Testing it out', 'Testing']);
  });
});

