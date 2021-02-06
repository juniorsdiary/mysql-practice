import { BOOK_AUTHOR_TABLE_NAME } from '../TABLES';
import { executeMysqlQuery } from '../executeMysqlQuery';
import { getInsertQuery } from '../getInsertQuery';

const getOrCreateBookAuthor = async (bookAuthor: any) => {
    const bookAuthorSelectQuery = `SELECT * FROM \`${BOOK_AUTHOR_TABLE_NAME}\` where \`book_id\`= ? and \`author_id\`= ?`;

    const [data] = await executeMysqlQuery(bookAuthorSelectQuery, [bookAuthor.book_id, bookAuthor.author_id]);

    if (data) return data;

    const bookAuthorResult = getInsertQuery(BOOK_AUTHOR_TABLE_NAME, bookAuthor);

    return await executeMysqlQuery(bookAuthorResult, [bookAuthor.book_id, bookAuthor.author_id]);
}

export {
    getOrCreateBookAuthor
};