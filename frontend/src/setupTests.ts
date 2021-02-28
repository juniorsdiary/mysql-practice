// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { shallow, render, mount } from 'enzyme';

import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.render = render; global.shallow = shallow; global.mount = mount;
