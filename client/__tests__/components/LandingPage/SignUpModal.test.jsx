import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { SignUpModal } from '../../../components/Index/SignUpModal.jsx';
import { mockData } from '../../../__mocks__/mockData';

describe('<SignUpModal />', () => {
  it('Component should render correctly', () => {
    const wrapper = shallow(<SignUpModal { ...mockData.signUp.props } />);
    const tree = toJson(wrapper);
    expect(tree.type).toBe('div');
    expect(tree.props).toEqual({ className: 'row modal', id: 'modal1' });
  });
  it('should update the state on in input', () => {
    const wrapper = shallow(<SignUpModal { ...mockData.signUp.props } />);
    const input = wrapper.find("input[name='username']");
    input.simulate('change', mockData.signUp.target);
    expect(wrapper.state().username).toEqual('Samuel');
  });
  it('should be called on button click', () => {
    const wrapper = shallow(<SignUpModal {...mockData.signUp.props } />);
    const onSubmit = wrapper.find('.formData');
    onSubmit.simulate('submit', {
      preventDefault: () => {
      }
    });
    expect(wrapper.state().username).toEqual('');
  });
});

