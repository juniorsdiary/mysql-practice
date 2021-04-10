import { getUpdateQuery } from '../../mysql/getUpdateQuery';
import { AUTHORS_TABLE_NAME, BOOKS_TABLE_NAME } from '../../../const/TABLES';

import faker from 'faker';

describe('getUpdateQuery helper function should render valid string for mysql query execution', () => {
    test(`getUpdateQuery for ${BOOKS_TABLE_NAME} with basic valid data`, () => {
        // ARRANGE
        const updateData = {
            title: faker.lorem.word(9),
            pages: faker.random.alphaNumeric(3),
        };

        const whereQuery = {
            book_id: faker.datatype.number(100)
        };

        // ASSERT
        const assertionData = getUpdateQuery(BOOKS_TABLE_NAME, {
            updateData,
            where: whereQuery
        });

        const expectedValue = `UPDATE ${BOOKS_TABLE_NAME} SET title="${updateData.title}", pages="${updateData.pages}" WHERE book_id=${whereQuery.book_id}`;

        // ACT
        expect(assertionData).toEqual(expectedValue);
    });

    test(`getUpdateQuery for ${BOOKS_TABLE_NAME} with invalid data`, () => {
        // ARRANGE
        const updateData = {
            title: faker.lorem.word(9),
            pages: null,
        };

        const whereQuery = {
            book_id: null
        };

        // ASSERT
        const assertionData = getUpdateQuery(BOOKS_TABLE_NAME, {
            updateData,
            where: whereQuery
        });

        const expectedValue = `UPDATE ${BOOKS_TABLE_NAME} SET title="${updateData.title}"`;

        // ACT
        expect(assertionData)
            .toEqual(expectedValue.trim());
    });

    test(`getUpdateQuery for ${AUTHORS_TABLE_NAME} with valid data`, () => {
        // ARRANGE
        const updateData = {
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            middle_name: faker.name.middleName(),
        };

        const whereQuery = {
            author_id: faker.datatype.number(100),
        };

        // ASSERT
        const assertionData = getUpdateQuery(AUTHORS_TABLE_NAME, {
            updateData,
            where: whereQuery
        });

        const expectedValue = `UPDATE ${AUTHORS_TABLE_NAME} SET first_name="${updateData.first_name}", last_name="${updateData.last_name}", middle_name="${updateData.middle_name}" WHERE author_id=${whereQuery.author_id}`;

        // ACT
        expect(assertionData)
            .toEqual(expectedValue);
    });

    test(`getUpdateQuery for ${AUTHORS_TABLE_NAME} with invalid data`, () => {
        // ARRANGE

        const whereQuery = {
            author_id: faker.datatype.number(100),
        };

        // ASSERT
        const assertionData = getUpdateQuery(AUTHORS_TABLE_NAME, {
            where: whereQuery
        });

        const expectedValue = `Invalid update data`;

        // ACT
        expect(assertionData)
            .toEqual(expectedValue);
    });

    test(`getUpdateQuery for some invalid table name`, () => {
        // ARRANGE
        const updateData = {
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            middle_name: faker.name.middleName(),
        };

        const whereQuery = {
            author_id: faker.datatype.number(100),
        };

        // ASSERT
        const assertionData = getUpdateQuery('author', {
            updateData,
            where: whereQuery
        });

        const expectedValue = `Please pass valid table name`;

        // ACT
        expect(assertionData)
            .toEqual(expectedValue);
    });
})
