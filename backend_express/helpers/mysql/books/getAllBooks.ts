import { executeMysqlQuery } from '../executeMysqlQuery';
import { BOOKS_TABLE_NAME } from '../TABLES';
import { BookType, GetAllBooksArgs } from '../../../types';

const getAllBooks = async ({ skip, limit, order, orderBy }: GetAllBooksArgs): Promise<{ books: BookType[], count: number }> => {
    const baseQuery = `SELECT * FROM ${BOOKS_TABLE_NAME}`;

    const orderQuery = order && orderBy ? `${baseQuery} ORDER BY ${orderBy} ${order.toUpperCase()}` : baseQuery;
    const paginationQuery = skip && limit ? `${orderQuery} LIMIT ${limit} OFFSET ${skip}` : orderQuery;

    const books = await executeMysqlQuery(paginationQuery, []);

    const count = await executeMysqlQuery(`SELECT COUNT(*) FROM ${BOOKS_TABLE_NAME}`, []);

    return {
        books,
        count: count[0]['COUNT(*)'],
    }
};

export {
    getAllBooks,
}