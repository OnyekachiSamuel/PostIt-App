import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { SignUpModal, mapStateToProps } from '../../../components/Index/SignUpModal.jsx';
import { mockData } from '../../../__mocks__/mockData';

describe('<SignUpModal />', () => {
  beforeEach(() => {
    const setup = (item) => {
      return mapStateToProps(item);
    };
    const state = setup(mockData.signUp.state);
  });

  it('Component should render correctly', () => {
    const wrapper = shallow(<SignUpModal { ...mockData.signUp.props } />);
    const tree = toJson(wrapper);
    expect(tree.type).toBe('div');
    expect(tree.props).toEqual({ className: 'row modal', id: 'modal1' });
  });

  it(`should call the onChange method to update
   the state when filling the sign up form`, () => {
    const wrapper = shallow(<SignUpModal { ...mockData.signUp.props } />);
    const input = wrapper.find("input[name='username']");
    input.simulate('change', mockData.signUp.target);
    expect(wrapper.state().username).toEqual('Samuel');
  });

  it('should call the submit method on the click of submit button', () => {
    const wrapper = shallow(<SignUpModal {...mockData.signUp.props } />);
    const onSubmit = wrapper.find('.formData');
    onSubmit.simulate('submit', {
      preventDefault: () => {
      }
    });
    expect(wrapper.state().username).toEqual('');
  });
});

