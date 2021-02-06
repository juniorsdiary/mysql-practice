import { getSelectQuery } from '../getSelectQuery';
import { executeMysqlQuery } from '../executeMysqlQuery';
import { getInsertQuery } from "../getInsertQuery";
import { TAGS_TABLE_NAME } from '../TABLES';

const getOrCreateTag = async (tag: string) => {
    const tagSelectQuery = getSelectQuery(TAGS_TABLE_NAME, 'tag_name');

    const [data] = await executeMysqlQuery(tagSelectQuery, [tag]);

    if (data) return data;

    const tagInsertQuery = getInsertQuery(TAGS_TABLE_NAME, {
        tag_name: tag,
    });

    return await executeMysqlQuery(tagInsertQuery, [tag]);
}

export {
    getOrCreateTag
};