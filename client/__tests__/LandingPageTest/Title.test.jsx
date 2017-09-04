import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Title from '../../components/Index/Title.jsx';

describe('<Title />', () => {
  it('Title component should render correctly', () => {
    const wrapper = shallow(<Title />);
    const tree = toJson(wrapper);
    expect(true).toBe(true);
    expect(tree.type).toBe('div');
    expect(tree.children[0].type).toBe('h1');
    expect(tree.children[1].type).toBe('h2');
    expect(tree.children[2].type).toBe('Link');
    expect(wrapper.contains('We have got you connected')).toBe(true);
    expect(wrapper.contains('post it today and share your thoughts in your groups.')).toBe(true);
    expect(wrapper.contains('Sign Up Now')).toBe(true);
  });
});
