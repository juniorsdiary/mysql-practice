import React from 'react';
import { shallow } from 'enzyme';
import App from "./App";
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { RoutesContainer } from './containers/RoutesContainer/RoutesContainer';
import { NavigationContainer } from './containers/NavigationContainer/NavigationContainer';

describe('<App />', () => {
    it('renders  <AppBar /> component', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(AppBar)).toHaveLength(1);
        expect(wrapper.find(Typography)).toHaveLength(1);
        expect(wrapper.find(RoutesContainer)).toHaveLength(1);
        expect(wrapper.find(NavigationContainer)).toHaveLength(1);
    });
})
