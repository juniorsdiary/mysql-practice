import { executeMysqlQuery } from '../executeMysqlQuery';
import { BOOKS_TABLE_NAME } from '../TABLES';
import { BookType } from '../../../types';

const getAllBooks = async ({ skip, limit }: { skip: number, limit: number }): Promise<{ books: BookType[], count: number }> => {
    const books = await executeMysqlQuery(`SELECT * FROM ${BOOKS_TABLE_NAME} LIMIT ${limit} OFFSET ${skip}`, []);

    const count = await executeMysqlQuery(`SELECT COUNT(*) FROM ${BOOKS_TABLE_NAME}`, []);

    return {
        books,
        count: count[0]['COUNT(*)'],
    }
};

export {
    getAllBooks,
}