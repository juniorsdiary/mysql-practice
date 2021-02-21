import { executeMysqlQuery } from '../executeMysqlQuery';
import { AUTHORS_TABLE_NAME } from '../TABLES';
import { AuthorType, GetAllBooksArgs} from '../../../types';

const getAllAuthors = async ({ skip, limit, order, orderBy }: GetAllBooksArgs): Promise<{ authors: AuthorType[], count: number }> => {
    const baseQuery = `SELECT * FROM ${AUTHORS_TABLE_NAME}`;

    const orderQuery = order && orderBy ? `${baseQuery} ORDER BY ${orderBy} ${order.toUpperCase()}` : baseQuery;
    const paginationQuery = skip && limit ? `${orderQuery} LIMIT ${limit} OFFSET ${skip}` : orderQuery;

    const authors = await executeMysqlQuery(paginationQuery, []);

    const count = await executeMysqlQuery(`SELECT COUNT(*) FROM ${AUTHORS_TABLE_NAME}`, []);

    return {
        authors: authors.map((book: AuthorType) => ({ ...book, id: book.author_id })),
        count: count[0]['COUNT(*)'],
    }
};

export {
    getAllAuthors,
}