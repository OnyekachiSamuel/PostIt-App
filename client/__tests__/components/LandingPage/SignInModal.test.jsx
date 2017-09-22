import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { SignInModal } from '../../../components/Index/SignInModal.jsx';

const props = {
  signInRequest: jest.fn(),
  googleAuthRequest: jest.fn(),
  forgetPasswordRequest: jest.fn()
};

describe('<SignInModal />', () => {
  it('component should render correctly', () => {
    const wrapper = shallow(<SignInModal { ...props } />);
    expect(wrapper.node.props.className).toEqual('row modal');
    expect(wrapper.node.props.id).toEqual('modal2');
  });
  describe('Component: SignInModal', () => {
    it('should update the state on in input', () => {
      const wrapper = shallow(<SignInModal { ...props }/>);
      const event = {
        target: {
          name: 'name',
          value: 'Dan',
        }
      };
      wrapper.instance().onChange(event);
      expect(wrapper.state().name).toEqual('Dan');
      expect(wrapper.node.props.className).toEqual('row modal');
      expect(wrapper.node.props.id).toEqual('modal2');
    });
  });
  describe('Component: SignInModal', () => {
    it('should be called on button click', () => {
      const mockOnSubmit = sinon.spy(() => {});
      const wrapper = shallow(<SignInModal onSubmit = { mockOnSubmit } {...props} />);
      const btn = wrapper.find('.btn');
      btn.simulate('click', mockOnSubmit());
      expect(mockOnSubmit.calledOnce).toBe(true);
      expect(btn.node.props.className).toBe('btn waves-effect waves-light');
      expect(btn.node.props.type).toBe('submit');
      expect(btn.node.props.name).toBe('action');
      expect(btn.node.props.children).toBe('Submit');
    });
  });
});

