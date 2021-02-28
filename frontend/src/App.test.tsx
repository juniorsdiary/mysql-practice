import React from 'react';
import { shallow } from 'enzyme';
import App from "./App";
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { RoutesContainer } from './containers/RoutesContainer/RoutesContainer';
import { NavigationContainer } from './containers/NavigationContainer/NavigationContainer';

const wrapper = shallow(<App />);

describe('App component', () => {
    it('renders  <AppBar /> component', () => {
        expect(wrapper.find(AppBar)).toHaveLength(1);
    });

    it('renders  <NavigationContainer /> component', () => {
        expect(wrapper.find(NavigationContainer)).toHaveLength(1);
    });

    it('renders  <RoutesContainer /> component', () => {
        expect(wrapper.find(RoutesContainer)).toHaveLength(1);
    });

    it('renders  <Typography /> component', () => {
        expect(wrapper.find(Typography)).toHaveLength(1);
    });
})