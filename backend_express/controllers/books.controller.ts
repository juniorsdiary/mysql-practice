import { Request, Response } from 'express';

import { getAllBooks } from '../helpers/mysql/books/getAllBooks';
import { getOneBook } from '../helpers/mysql/books/getOneBook';
import { getBookAuthors } from '../helpers/mysql/bookAuthor/getBookAuthors';
import { getBookTags } from '../helpers/mysql/bookTag/getBookTags';

import { BookType, TagType, AuthorType } from '../types';

const getBooks = async (req: Request, res: Response) => {
    const { skip, limit, order, orderBy } = req.query as any;

    const books = await getAllBooks({ skip, limit, order, orderBy });

    res.json(books);
};

const getBook = async (req: Request, res: Response) => {
    const bookId = req.params.id
    const book: BookType[] = await getOneBook(bookId);
    const bookAuthors: AuthorType[] = await getBookAuthors(bookId);
    const bookTags: TagType[] = await getBookTags(bookId);

    res.json({
        ...(book[0]),
        authors: bookAuthors,
        tags: bookTags,
    });
};

const booksController = {
    getBooks,
    getBook,
}

export {
    booksController,
};