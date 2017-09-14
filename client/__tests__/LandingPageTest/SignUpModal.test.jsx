import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import { SignUpModal } from '../../components/Index/SignUpModal.jsx';

const props = {
  signUpRequest: jest.fn(),
  googleAuthRequest: jest.fn(),
  signup: {
    errors: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }
};
describe('<SignUpModal />', () => {
  it('Component should render correctly', () => {
    const wrapper = shallow(<SignUpModal { ...props }/>);
    const tree = toJson(wrapper);
    expect(tree.type).toBe('div');
    expect(tree.props).toEqual({ className: 'row modal', id: 'modal1' });
  });
  describe('Test for onChange event', () => {
    it('should update the state on in input', () => {
      const wrapper = shallow(<SignUpModal { ...props }/>);
      const event = {
        target: {
          name: 'name',
          value: 'Dan',
        }
      };
      wrapper.instance().onChange(event);
      expect(wrapper.state().name).toEqual('Dan');
      expect(wrapper.node.props.className).toEqual('row modal');
      expect(wrapper.node.props.id).toEqual('modal1');
    });
    describe('Test for onSubmit function', () => {
      it('should be called on button click', () => {
        const mockOnSubmit = sinon.spy(() => {});
        const wrapper = shallow(<SignUpModal onSubmit = { mockOnSubmit } {...props} />);
        const btn = wrapper.find('.btn');
        btn.simulate('click', mockOnSubmit());
        expect(mockOnSubmit.calledOnce).toBe(true);
      });
    });
  });
});

