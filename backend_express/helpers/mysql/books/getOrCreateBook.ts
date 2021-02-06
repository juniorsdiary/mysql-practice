import { executeMysqlQuery } from '../executeMysqlQuery';
import { getInsertQuery } from "../getInsertQuery";
import { BOOKS_TABLE_NAME } from '../TABLES';

const getOrCreateBook = async (book: any) => {
    const bookSelectQuery = `SELECT * FROM ${BOOKS_TABLE_NAME} where title= ? AND subtitle= ? AND pages= ?`;

    const [data] = await executeMysqlQuery(bookSelectQuery, [book.title, book.subtitle, book.pages]);

    if (data) return data;

    const bookQuery = getInsertQuery(BOOKS_TABLE_NAME, {
        title: book.title,
        subtitle: book.subtitle,
        pages: book.pages,
    });

    return await executeMysqlQuery(bookQuery, [book.title, book.subtitle, book.pages]);
}

export {
    getOrCreateBook
};