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
  it('should update the state on in input', () => {
    const wrapper = shallow(<SignInModal { ...mockData.signIn.props } />);
    wrapper.setState({ visible: false });
    const input = wrapper.find("input[name='username']");
    input.simulate('change', mockData.signIn.target);
    expect(wrapper.state().username).toEqual('Samuel');
  });
  it('should be called on button click', () => {
    const mockOnSubmit = sinon.spy(() => { });
    const wrapper = shallow(<SignInModal onSubmit={mockOnSubmit}
     {...mockData.signIn.props} />);
    const btn = wrapper.find('.btn');
    btn.simulate('click', mockOnSubmit());
    expect(mockOnSubmit.calledOnce).toBe(true);
    expect(btn.node.props.className).toBe('btn waves-effect waves-light');
    expect(btn.node.props.type).toBe('submit');
    expect(btn.node.props.name).toBe('action');
    expect(btn.node.props.children).toBe('Submit');
  });
});

