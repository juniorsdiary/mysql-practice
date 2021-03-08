import { executeMysqlQuery } from '../executeMysqlQuery';
import { AUTHORS_TABLE_NAME } from '../TABLES';
import { AuthorType, GetEntityArgs, SelectEntityResponse } from '../../../types';
import { buildSelectEntityQuery } from '../buildSelectEntityQuery';

const getAllAuthors = async ({ skip, limit, order, orderBy }: GetEntityArgs): Promise<SelectEntityResponse> => {
    const selectEntityQuery = buildSelectEntityQuery({
        tableName: AUTHORS_TABLE_NAME,
        skip,
        limit,
        order,
        orderBy
    });

    const authors = await executeMysqlQuery<AuthorType>(selectEntityQuery, []);

    const count = await executeMysqlQuery<any>(`SELECT COUNT(*) FROM ${AUTHORS_TABLE_NAME}`, []);

    return {
        data: authors.map((book: AuthorType) => ({ ...book, id: book.author_id })),
        count: count[0]['COUNT(*)'],
    }
};

export {
    getAllAuthors,
}