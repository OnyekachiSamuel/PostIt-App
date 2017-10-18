import React from 'react';
import { shallow } from 'enzyme';
import { ForgetPasswordPage, mapStateToProps } from '../../components/ForgetPasswordPage.jsx';
import { mockData } from '../../__mocks__/mockData';


describe('<ForgetPasswordPage />', () => {
  beforeEach(() => {
    const setup = () => {
      return mapStateToProps(mockData.postedMessage.state);
    };
    const state = setup();
  });

  it('Component should render correctly', () => {
    const wrapper = shallow(
      <ForgetPasswordPage {...mockData.forgetPasswordPage.props} />);
    expect(wrapper.node.type).toEqual('div');
    expect(wrapper.contains('POST IT')).toBe(true);
  });

  it(`should call onChange function to
   update the password state on typing into the password field`, () => {
    const wrapper = shallow(
     <ForgetPasswordPage {...mockData.forgetPasswordPage.props } />);
    const input = wrapper.find('#password');
    input.simulate('change', mockData.forgetPasswordPage.target);
    expect(wrapper.state().password).toEqual('admin');
  });

  it('should call onSubmit function on click of submit button', () => {
    const wrapper = shallow(
    <ForgetPasswordPage {...mockData.forgetPasswordPage.props} />);
    const form = wrapper.find('#formData');
    form.simulate('submit', {
      preventDefault: jest.fn()
    });
    expect(form.node.type).toEqual('form');
  });
});
