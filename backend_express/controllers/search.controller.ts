import { Request, Response } from 'express';

import { getSearchResult } from '../helpers/mysql/getSearchResult';

type CustomQuery = {
    title: string;
    author: string;
    skip?: number;
    limit?: number;
    order?: string;
    orderBy?: string;
};

const getResult = async (req: Request, res: Response): Promise<void> => {
    const { title, author, skip, limit, order, orderBy } = req.query as CustomQuery;

    const [ first_name, last_name ] = author?.split(' ') ?? [];

    const result = await getSearchResult({ title, first_name, last_name, skip, limit, order, orderBy });

    res.json(result);
}

const searchController = {
    getResult,
};

export {
    searchController,
};