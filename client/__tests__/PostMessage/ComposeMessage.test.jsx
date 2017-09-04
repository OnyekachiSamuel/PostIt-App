import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import { ComposeMessage } from '../../components/PostMessage/ComposeMessage.jsx';

const props = {
  signUpRequest: jest.fn(),
  googleAuthRequest: jest.fn(),
  match: {
    params: {
      groupId: 45
    }
  }
};
describe('<ComposeMessage />', () => {
  it('Component should render correctly', () => {
    const wrapper = shallow(<ComposeMessage { ...props }/>);
    const tree = toJson(wrapper);
    expect(tree.type).toBe('div');
    expect(tree.props).toEqual({ "className": "shift-left" });
  });
  describe('Test for onChange event', () => {
    it('should update the state on in input', () => {
      const wrapper = shallow(<ComposeMessage  {...props}/>);
      const event = {
        target: {
          name: 'message',
          value: 'I will be with you in a moment',
        }
      };
      wrapper.instance().onChange(event);
      expect(wrapper.state().message).toEqual('I will be with you in a moment');
      expect(wrapper.node.props.className).toEqual('shift-left');
    });
    describe('Test for onSubmit function', () => {
      it('should be called on button click', () => {
        const mockOnSubmit = sinon.spy(() => {});
        const wrapper = shallow(<ComposeMessage onSubmit = { mockOnSubmit } />);
        const btn = wrapper.find('.modal-btn');
        btn.simulate('click', mockOnSubmit());
        expect(mockOnSubmit.calledOnce).toBe(true);
      });
    });
  });
});

