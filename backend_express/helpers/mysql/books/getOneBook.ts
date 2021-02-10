import { executeMysqlQuery } from '../executeMysqlQuery';
import { BOOKS_TABLE_NAME } from '../TABLES';
import { BookType } from '../../../types';

const getOneBook = async (id: string): Promise<BookType> => {
    return await executeMysqlQuery(`SELECT * FROM ${BOOKS_TABLE_NAME} where book_id= ?`, [id]);
};

export {
    getOneBook,
}