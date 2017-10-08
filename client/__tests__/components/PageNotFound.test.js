import React from 'react';
import { shallow } from 'enzyme';
import { NotFoundPage } from '../../components/NotFoundPage.jsx';

describe('<NotFoundPage />', () => {
  it('Component should render correctly', () => {
    const wrapper = shallow(<NotFoundPage />);
    expect(wrapper.contains('Page Not Found')).toBe(true);
  });
});
