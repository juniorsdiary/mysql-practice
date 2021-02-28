import React from 'react';
import { shallow } from 'enzyme';
import { RoutesContainer, routes } from './RoutesContainer';
import { Route } from 'react-router-dom';

const wrapper = shallow(<RoutesContainer />);

describe('<RoutesContainer />', () => {
    it('renders  <ListItem /> component', () => {
        expect(wrapper.find(Route)).toHaveLength(routes.length);
    });
})
