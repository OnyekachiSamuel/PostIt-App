import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import { MemoryRouter } from 'react-router';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { PostedMessage } from '../../../components/PostMessage/PostedMessage.jsx';

const initialState = {
  post: {
    message: 'Good one'
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
    const wrapper = shallow(<PostedMessage { ...props }/>,
    { context: { store: mockStore(initialState) } });
    const tree = toJson(wrapper);
    expect(tree.type).toBe('div');
    expect(tree.props.className).toEqual('shift-right');
    expect(tree.children[0].type).toEqual('Link');
  });
  it('calls componentDidMount', () => {
    const prop1 = {
      fetchPostRequest: jest.fn(),
      updateGroupInfo: jest.fn(),
      signin: {
        isAuthenticated: true,
        user: {
          userId: 7
        }
      },
      match: {
        params: {
          groupId: 9
        },
        groupName: 'Andela'
      }
    };
    sinon.spy(PostedMessage.prototype, 'componentDidMount');
    const wrapper = mount(
      <MemoryRouter>
        <PostedMessage {...prop1 } />
      </MemoryRouter>
    );
    expect(PostedMessage.prototype.componentDidMount.calledOnce).toBe(true);
    expect(wrapper.node.state).toEqual(null);
  });
});

