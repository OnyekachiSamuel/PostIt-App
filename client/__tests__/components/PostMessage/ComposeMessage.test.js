import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { ComposeMessage } from '../../../components/PostMessage/ComposeMessage.jsx';
import { mockData } from '../../../__mocks__/mockData';

describe('<ComposeMessage />', () => {
  it('Component should render correctly', () => {
    const wrapper = shallow(
    <ComposeMessage
     { ...mockData.composeMessage.props }/>);
    const tree = toJson(wrapper);
    expect(tree.type).toBe('div');
    expect(wrapper.contains('View members')).toBe(true);
  });
  it(`should call the onChange method to update t
  he state on the selection of message priority`, () => {
    const wrapper = shallow(
    <ComposeMessage {...mockData.composeMessage.props}/>);
    const select = wrapper.find('#select');
    select.simulate('change', mockData.composeMessage.target);
    expect(wrapper.state().priority).toEqual('Urgent');
  });
  it('should call onSubmit function on click of post botton', () => {
    const wrapper = shallow(
    <ComposeMessage {...mockData.composeMessage.props} />);
    const btn = wrapper.find('#formData');
    btn.simulate('submit', {
      target: {
        name: 'message',
        value: 'I am coming'
      },
      preventDefault: jest.fn()
    });
    expect(wrapper.state().message).toEqual('');
  });
});

