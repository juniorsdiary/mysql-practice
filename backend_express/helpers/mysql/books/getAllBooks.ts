import { executeMysqlQuery } from '../executeMysqlQuery';
import { BOOKS_TABLE_NAME } from '../TABLES';
import { BookType, GetEntityArgs, SelectEntityResponse } from '../../../types';
import { buildSelectEntityQuery } from '../buildSelectEntityQuery';

const getAllBooks = async ({ skip, limit, order, orderBy }: GetEntityArgs): Promise<SelectEntityResponse> => {
    const selectEntityQuery = buildSelectEntityQuery({
        tableName: BOOKS_TABLE_NAME,
        skip,
        limit,
        order,
        orderBy
    });

    const books = await executeMysqlQuery(selectEntityQuery, []);

    const count = await executeMysqlQuery(`SELECT COUNT(*) FROM ${BOOKS_TABLE_NAME}`, []);

    return {
        data: books.map((book: BookType) => ({ ...book, id: book.book_id })),
        count: count[0]['COUNT(*)'],
    };
};

export {
    getAllBooks,
}