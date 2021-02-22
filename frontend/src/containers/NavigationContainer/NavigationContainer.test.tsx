import React from 'react';
import { shallow } from 'enzyme';
import { NavigationContainer, links } from './NavigationContainer';

import ListItem from '@material-ui/core/ListItem';

describe('<NavigationContainer />', () => {
    it('renders  <AppBar /> component', () => {
        const wrapper = shallow(<NavigationContainer />);
        expect(wrapper.find(ListItem)).toHaveLength(links.length);
    });
})
