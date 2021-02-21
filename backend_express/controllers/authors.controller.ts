import { AuthorType, BookType } from '../types';
import { Request, Response } from 'express';
import { getAllAuthors } from '../helpers/mysql/authors/getAllAuthors';
import { getOneAuthor } from '../helpers/mysql/authors/getOneAuthor';
import { getAuthorBooks } from '../helpers/mysql/authors/getAuthorBooks';

const getAuthors = async (req: Request, res: Response): Promise<void> => {
    const { skip, limit, order, orderBy } = req.query as any;

    const authors = await getAllAuthors({
        skip,
        limit,
        order,
        orderBy
    });

    res.json(authors);
};

const getAuthor = async (req: Request, res: Response): Promise<void> => {
    const authorId = req.params.id;

    const author: AuthorType[] = await getOneAuthor(authorId);
    const authorBooks: BookType[] = await getAuthorBooks(authorId);

    res.json({
        ...(author[0]),
        books: authorBooks,
    });
};

const authorsController = {
    getAuthors,
    getAuthor,
}

export {
    authorsController,
};