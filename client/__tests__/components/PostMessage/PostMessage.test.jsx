import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { PostedMessage } from '../../../components/PostMessage/PostedMessage.jsx';

const initialState = {
  post: {
    message: 'Good one'
  },
  signin: {
    isAuthenticated: true,
  }
};
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const props = {
  fetchPostRequest: jest.fn(),
  messages: ['I am going now', 'I will be with you']
};
describe('<PostMessage />', () => {
  it('Component should render correctly', () => {
    const wrapper = shallow(<PostedMessage { ...props }/>, { context: { store: mockStore(initialState) } });
    const tree = toJson(wrapper);
    expect(tree.type).toBe('div');
    expect(tree.props.className).toEqual('shift-right');
    expect(tree.children[0].type).toEqual('Link');
  });
});

