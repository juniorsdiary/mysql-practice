import { BookType, SearchResultType } from '../../types';
import { executeMysqlQuery } from './executeMysqlQuery';
import { AUTHORS_TABLE_NAME, BOOK_AUTHOR_TABLE_NAME, BOOKS_TABLE_NAME } from './TABLES';

const getSearchResult = async ({ title, first_name, last_name, skip, limit, order, orderBy }: SearchResultType): Promise<unknown> => {
    const titleQuery = title ? `b.title LIKE "%${title}%"` : '';
    const firstNameQuery = first_name ? `a.first_name LIKE "%${first_name}%"` : '';
    const lastNameQuery = last_name ? `a.last_name LIKE "%${last_name}%"` : '';

    const filterQuery = [titleQuery, firstNameQuery, lastNameQuery]
        .filter(q => q)
        .map((query, i) => {
            return i === 0 ? (`WHERE ${query}`) : (`AND ${query}`);
        })
        .join(' ');

    const baseSelect = `SELECT * FROM ${BOOKS_TABLE_NAME}`;
    const countSelect = `SELECT COUNT(*) FROM ${BOOKS_TABLE_NAME}`;
    const joinQuery = `
        JOIN (
            SELECT DISTINCT b.book_id search_book_id FROM ${BOOKS_TABLE_NAME} b
            JOIN ${BOOK_AUTHOR_TABLE_NAME} ba ON ba.book_id=b.book_id
            JOIN ${AUTHORS_TABLE_NAME} a ON a.author_id=ba.author_id
            ${filterQuery}
        ) as sb ON sb.search_book_id = ${BOOKS_TABLE_NAME}.book_id
    `
    const searchQuery = `${baseSelect}${joinQuery}`;
    const countQuery = `${countSelect}${joinQuery}`;

    const orderQuery = order && orderBy ? `${searchQuery} ORDER BY ${orderBy} ${order.toUpperCase()}` : searchQuery;

    const paginationQuery = skip && limit ? `${orderQuery} LIMIT ${limit} OFFSET ${skip}` : orderQuery;

    const data = await executeMysqlQuery<BookType>(paginationQuery, []);

    const count = await executeMysqlQuery<any>(countQuery, []);

    return {
        data: data.map((book: BookType) => ({...book, id: book.book_id})),
        count: count[0]['COUNT(*)'],
    };
}

export { getSearchResult }