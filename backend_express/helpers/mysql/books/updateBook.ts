import { getUpdateQuery } from '../getUpdateQuery';
import { executeMysqlQuery } from '../executeMysqlQuery';
import { BOOKS_TABLE_NAME } from '../TABLES';

const updateBook = async (data: any) => {
    const updateBookQuery = getUpdateQuery(BOOKS_TABLE_NAME, data);

    await executeMysqlQuery(updateBookQuery, []);
};

export {
    updateBook,
};