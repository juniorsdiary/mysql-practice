import { BOOK_TAG_TABLE_NAME } from '../TABLES';
import { executeMysqlQuery } from '../executeMysqlQuery';
import { getInsertQuery } from '../getInsertQuery';

const getOrCreateBookTag = async (bookTag: any) => {
    const bookTagSelectQuery = `SELECT * FROM \`${BOOK_TAG_TABLE_NAME}\` where \`book_id\`= ? and \`tag_id\`= ? `;

    const [data] = await executeMysqlQuery(bookTagSelectQuery, [bookTag.book_id, bookTag.tag_id]);

    if (data) return data;

    const bookTagQuery = getInsertQuery(BOOK_TAG_TABLE_NAME, bookTag);

    return await executeMysqlQuery(bookTagQuery, [bookTag.book_id, bookTag.tag_id]);
}

export {
    getOrCreateBookTag
};