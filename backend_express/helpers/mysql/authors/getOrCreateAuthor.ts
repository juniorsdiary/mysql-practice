import { AUTHORS_TABLE_NAME } from '../TABLES';
import { executeMysqlQuery } from '../executeMysqlQuery';
import { getInsertQuery } from '../getInsertQuery';

const getOrCreateAuthor = async (author: any) => {
    const authorSelectQuery = `SELECT * FROM \`${AUTHORS_TABLE_NAME}\` WHERE first_name = ? AND last_name = ? AND middle_name = ?`;

    const data = await executeMysqlQuery(authorSelectQuery, [author.first_name, author.last_name, author.middle_name]);

    if (data?.length) return data[0];

    const authorQuery = getInsertQuery(AUTHORS_TABLE_NAME, {
        first_name: author.first_name,
        last_name: author.last_name,
        middle_name: author.middle_name,
    });

    return await executeMysqlQuery(authorQuery, [author.first_name, author.last_name, author.middle_name]);
}

export { getOrCreateAuthor }