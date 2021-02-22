import { Request, Response } from 'express';

import { getAllTags } from '../helpers/mysql/tags/getAllTags';
import { getOneTag } from '../helpers/mysql/tags/getOneTag';
import { getTagBooks } from '../helpers/mysql/tags/getTagBooks';

import { BookType, TagType } from '../types';

const getTags = async (req: Request, res: Response): Promise<unknown> => {
    const { skip, limit, order, orderBy } = req.query as any;

    const books = await getAllTags({
        skip,
        limit,
        order,
        orderBy
    });

    res.json(books);

    return;
};

const getTag = async (req: Request, res: Response): Promise<unknown> => {
    const tagId = req.params.id;

    const tag: TagType[] = await getOneTag(tagId);
    const tagBooks: BookType[] = await getTagBooks(tagId);

    res.json({
        ...(tag[0]),
        books: tagBooks,
    });

    return;
};

const tagsController = {
    getTags,
    getTag,
};

export {
    tagsController,
};