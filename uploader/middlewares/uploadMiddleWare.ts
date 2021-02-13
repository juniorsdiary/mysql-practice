import { Request, Response } from 'express';

const uploadMiddleWare = (req: Request, res: Response, next: any) => {
    req.pipe(req.busboy);
    req.busboy.on('file', (fieldname: string, file: any, filename: string, encoding: string, mimetype: string) => {
        // @ts-ignore
        req.file = file;
        // @ts-ignore
        req.fileName = filename;
        next();
    });
}

export { uploadMiddleWare }