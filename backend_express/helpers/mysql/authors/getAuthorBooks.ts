import { executeMysqlQuery } from '../executeMysqlQuery';
import { AUTHORS_TABLE_NAME, BOOK_AUTHOR_TABLE_NAME, BOOKS_TABLE_NAME } from '../../../const/TABLES';
import { BookType } from '../../../types';

const getAuthorBooks = async (authorId: string): Promise<BookType[]> => {
    const selectQuery = `
    SELECT ${BOOKS_TABLE_NAME}.* FROM ${AUTHORS_TABLE_NAME}
    JOIN ${BOOK_AUTHOR_TABLE_NAME} ON ${BOOK_AUTHOR_TABLE_NAME}.author_id = ${AUTHORS_TABLE_NAME}.author_id
    JOIN ${BOOKS_TABLE_NAME} ON ${BOOK_AUTHOR_TABLE_NAME}.book_id = ${BOOKS_TABLE_NAME}.book_id
    WHERE ${AUTHORS_TABLE_NAME}.author_id = ${authorId}
    `;

    return executeMysqlQuery(selectQuery, []);
}

export { getAuthorBooks };