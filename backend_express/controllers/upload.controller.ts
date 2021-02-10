import { Request, Response } from 'express';

const uploadBook = (req: Request, res: Response) => {
    res.end();
};

const uploadController = {
    uploadBook,
};

export {
    uploadController,
};