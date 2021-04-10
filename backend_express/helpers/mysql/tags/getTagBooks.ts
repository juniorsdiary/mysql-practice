import { BookType } from '../../../types';
import { executeMysqlQuery } from '../executeMysqlQuery';
import { BOOK_TAG_TABLE_NAME, BOOKS_TABLE_NAME, TAGS_TABLE_NAME } from '../../../const/TABLES';

type OptionsType = {
    count?: boolean;
}

const getTagBooks = (tagId: string, options?: OptionsType): Promise<BookType[]> => {
    const selectRowsCount = options?.count ? `COUNT(${BOOKS_TABLE_NAME}.book_id)` : `${BOOKS_TABLE_NAME}.*`;

    const selectQuery = `
        SELECT ${selectRowsCount} FROM ${TAGS_TABLE_NAME}
        JOIN ${BOOK_TAG_TABLE_NAME} ON ${BOOK_TAG_TABLE_NAME}.tag_id = ${TAGS_TABLE_NAME}.tag_id
        JOIN ${BOOKS_TABLE_NAME} ON ${BOOK_TAG_TABLE_NAME}.book_id = ${BOOKS_TABLE_NAME}.book_id
        WHERE ${TAGS_TABLE_NAME}.tag_id = ${tagId}
    `;

    return executeMysqlQuery(selectQuery, []);
}

export { getTagBooks };