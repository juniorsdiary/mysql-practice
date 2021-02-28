import React from 'react';
import { SingleAuthorContainer } from './SingleAuthorContainer';
import { shallow, render, mount } from 'enzyme';

import { AuthorType } from "../../types";

jest.mock('effector-react', () => {
    const faker = require('faker');

    const fakeSingleAuthor: AuthorType = {
        middle_name: faker.name.middleName(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        author_id: 1,
        books: [],
        id: 1,
    };

    return {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        useStore: jest.fn().mockReturnValue(fakeSingleAuthor)
    }
})

jest.mock('react-router', () => ({
    useParams: jest.fn().mockReturnValue({ id: '1' }),
}));

const wrapper = mount(<SingleAuthorContainer />);

describe('<SingleAuthorContainer />', () => {
    it('render snapshot', () => {
        console.log(wrapper.debug());
    })
})
