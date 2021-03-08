import {
    BOOK_TAG_TABLE_NAME,
    BOOKS_TABLE_NAME,
    TAGS_TABLE_NAME
} from '../TABLES';

import { executeMysqlQuery } from '../executeMysqlQuery';

const getBookTags = async <T>(id: string): Promise<Array<T>> => {
    const selectQuery = `
        SELECT ${TAGS_TABLE_NAME}.tag_id, ${TAGS_TABLE_NAME}.tag_name FROM ${BOOKS_TABLE_NAME}
        JOIN ${BOOK_TAG_TABLE_NAME} ON ${BOOK_TAG_TABLE_NAME}.book_id = ${BOOKS_TABLE_NAME}.book_id
        JOIN ${TAGS_TABLE_NAME} ON ${TAGS_TABLE_NAME}.tag_id = ${BOOK_TAG_TABLE_NAME}.tag_id
        WHERE ${BOOKS_TABLE_NAME}.book_id = ${id}
    `;

    return await executeMysqlQuery<T>(selectQuery, [id]);
}

export { getBookTags }