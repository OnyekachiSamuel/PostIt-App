import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { PostedMessage } from '../../components/PostMessage/PostedMessage.jsx';


const props = {
  fetchPostRequest: jest.fn(),
};
describe('<PostMessage />', () => {
  it('Component should render correctly', () => {
    const wrapper = shallow(<PostedMessage { ...props }/>);
    const tree = toJson(wrapper);
    expect(tree.type).toBe('div');
    expect(tree.props.className).toEqual('shift-right');
    expect(tree.children[0].type).toEqual('Link');
  });
});

