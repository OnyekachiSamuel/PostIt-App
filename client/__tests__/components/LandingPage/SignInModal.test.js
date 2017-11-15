import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { SignInModal, mapStateToProps } from '../../../components/Index/SignInModal.jsx';
import { mockData } from '../../../__mocks__/mockData';

describe('<SignInModal />', () => {
  beforeEach(() => {
    const setup = (item) => {
      return mapStateToProps(item);
    };
    const state = setup(mockData.signIn.state);
  });

  it('component should render correctly', () => {
    const wrapper = shallow(<SignInModal { ...mockData.signIn.props } />);
    expect(wrapper.node.props.className).toEqual('row modal');
    expect(wrapper.node.props.id).toEqual('modal2');
  });

  it(`should call the onChange method to update
   the state when filling the login form`, () => {
    const wrapper = shallow(<SignInModal { ...mockData.signIn.props } />);
    wrapper.setState({ visible: false });
    const input = wrapper.find("input[name='username']");
    input.simulate('change', mockData.signIn.target);
    expect(wrapper.state().username).toEqual('Samuel');
  });

  it('should call onSubmit function on click of the submit button', () => {
    const wrapper = shallow(<SignInModal {...mockData.signIn.props} />);
    const btn = wrapper.find('.formData');
    btn.simulate('submit', {
      preventDefault: () => {
      } });
    expect(wrapper.state().errors).toEqual({});
  });

  it(`should call onClick function on the click of 
  the navigation link for reset password option`, () => {
    const wrapper = shallow(<SignInModal {...mockData.signIn.props} />);
    const Link = wrapper.find('#toggle');
    Link.simulate('click');
    expect(wrapper.state().visible).toBe(true);
  });

  it(`should call onClickLogin function on the
     click of the navigation link for login in the sign in modal`, () => {
    const wrapper = shallow(<SignInModal {...mockData.signIn.props} />);
    wrapper.setState({ visible: true });
    const Link = wrapper.find('#loginLink');
    Link.simulate('click');
    expect(wrapper.state().visible).toBe(false);
  });
});

