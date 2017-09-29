import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import { MemoryRouter } from 'react-router';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { PostedMessage, mapStateToProps } from '../../../components/PostMessage/PostedMessage.jsx';
import { mockData } from '../../../__mocks__/mockData';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
describe('<PostMessage />', () => {
  beforeEach(() => {
    const setup = () => {
      return mapStateToProps(mockData.postedMessage.state);
    };
    const state = setup();
  });
  it('Component should render correctly', () => {
    const wrapper = shallow(<PostedMessage { ...mockData.postedMessage.props } />,
      { context: { store: mockStore(mockData.postedMessage.initialState) } });
    const tree = toJson(wrapper);
    expect(tree.type).toBe('div');
    expect(tree.props.className).toEqual('shift-right');
    expect(tree.children[0].type).toEqual('Link');
  });
  it('calls componentDidMount', () => {
    sinon.spy(PostedMessage.prototype, 'componentDidMount');
    const wrapper = mount(
      <MemoryRouter>
        <PostedMessage {...mockData.postedMessage.props } />
      </MemoryRouter>
    );
    expect(PostedMessage.prototype.componentDidMount.calledOnce).toBe(true);
    expect(wrapper.node.state).toEqual(null);
  });
});

