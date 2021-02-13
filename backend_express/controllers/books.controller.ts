import { getAllBooks } from '../helpers/mysql/books/getAllBooks';
import { getOneBook } from '../helpers/mysql/books/getOneBook';
import { Request, Response } from 'express';
import { BookType } from '../types';

const getBooks = async (req: Request, res: Response) => {
    const skip = (req.query as any).skip as number;
    const limit = (req.query as any).limit as number;

    const books = await getAllBooks({ skip, limit });

    res.json(books);
};

const getBook = async (req: Request, res: Response) => {
    const book: BookType[] = await getOneBook(req.params.id);

    res.json({
        ...(book[0])
    });
};

const booksController = {
    getBooks,
    getBook,
}

export {
    booksController,
};