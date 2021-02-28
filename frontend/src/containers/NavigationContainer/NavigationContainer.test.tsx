import React from 'react';
import { shallow } from 'enzyme';
import { NavigationContainer, links } from './NavigationContainer';

import ListItem from '@material-ui/core/ListItem';

const wrapper = shallow(<NavigationContainer />);

describe('<NavigationContainer />', () => {
    it('renders  <ListItem /> component', () => {
        expect(wrapper.find(ListItem)).toHaveLength(links.length);
    });
})
