import { TagType } from '../../../types';
import { executeMysqlQuery } from '../executeMysqlQuery';
import { TAGS_TABLE_NAME } from '../TABLES';

const getOneTag = async (tagId: string): Promise<TagType[]> => {
    return await executeMysqlQuery(`SELECT * FROM ${TAGS_TABLE_NAME} where tag_id= ?`, [tagId]);
};

export {
    getOneTag,
}