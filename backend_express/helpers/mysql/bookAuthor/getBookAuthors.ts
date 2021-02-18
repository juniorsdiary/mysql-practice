import { AUTHORS_TABLE_NAME, BOOK_AUTHOR_TABLE_NAME, BOOKS_TABLE_NAME } from '../TABLES';
import { executeMysqlQuery } from '../executeMysqlQuery';

const getBookAuthors = async (id: string) => {
    const selectQuery = `
        SELECT ${AUTHORS_TABLE_NAME}.author_id, ${AUTHORS_TABLE_NAME}.first_name, ${AUTHORS_TABLE_NAME}.last_name, ${AUTHORS_TABLE_NAME}.middle_name  FROM ${BOOKS_TABLE_NAME}
        JOIN ${BOOK_AUTHOR_TABLE_NAME} ON ${BOOK_AUTHOR_TABLE_NAME}.book_id = ${BOOKS_TABLE_NAME}.book_id
        JOIN ${AUTHORS_TABLE_NAME} ON ${AUTHORS_TABLE_NAME}.author_id = ${BOOK_AUTHOR_TABLE_NAME}.author_id
        WHERE ${BOOKS_TABLE_NAME}.book_id = ${id}
    `;

    return await executeMysqlQuery(selectQuery, [id]);
}

export { getBookAuthors }