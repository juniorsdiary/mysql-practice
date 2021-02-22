import { TAGS_TABLE_NAME } from '../TABLES';
import { executeMysqlQuery} from '../executeMysqlQuery';
import { BookType, GetEntityArgs, SelectEntityResponse, TagType } from '../../../types';
import { buildSelectEntityQuery } from '../buildSelectEntityQuery';
import { getTagBooks } from './getTagBooks';

const getAllTags = async ({ skip, limit, order, orderBy }: GetEntityArgs): Promise<SelectEntityResponse> => {
    const selectEntityQuery = buildSelectEntityQuery({
        tableName: TAGS_TABLE_NAME,
        skip,
        limit,
        order,
        orderBy
    });

    const tags = await executeMysqlQuery(selectEntityQuery, []);

    const count = await executeMysqlQuery(`SELECT COUNT(*) FROM ${TAGS_TABLE_NAME}`, []);

    const tagsWithBooks = tags.map(async (tag: TagType) => {
        const tagBooks: BookType[] = await getTagBooks(String(tag.tag_id));

        return {
            ...tag,
            id: tag.tag_id,
            books: tagBooks.length
        };
    });

    const data: TagType[] = await Promise.all(tagsWithBooks);

    return {
        data,
        count: count[0]['COUNT(*)'],
    };
}

export {
    getAllTags
};