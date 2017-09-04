import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import { SelectGroup } from '../../components/CreateGroup/GroupModal.jsx';

const props = {
  createGroupRequest: jest.fn(),
};
describe('<SelectGroup />', () => {
  it('Component should render correctly', () => {
    const wrapper = shallow(<SelectGroup { ...props }/>);
    const tree = toJson(wrapper);
    expect(tree.type).toBe('div');
    expect(tree.props).toEqual({ className: 'row modal', id: 'modal3' });
  });
  describe('Test for onChange event', () => {
    it('should update the state on in input', () => {
      const wrapper = shallow(<SelectGroup { ...props }/>);
      const event = {
        target: {
          name: 'groupName',
          value: 'Andela Team 08',
        }
      };
      wrapper.instance().onChange(event);
      expect(wrapper.state().groupName).toEqual('Andela Team 08');
      expect(wrapper.node.props.className).toEqual('row modal');
      expect(wrapper.node.props.id).toEqual('modal3');
    });
    describe('Test for onSubmit function', () => {
      it('should be called on button click', () => {
        const mockOnSubmit = sinon.spy(() => {});
        const wrapper = shallow(<SelectGroup onSubmit = { mockOnSubmit } {...props} />);
        const btn = wrapper.find('.btn');
        btn.simulate('click', mockOnSubmit());
        expect(mockOnSubmit.calledOnce).toBe(true);
      });
    });
  });
});

