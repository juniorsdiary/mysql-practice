import { Request, Response } from 'express';
import * as uuid from 'uuid';
import { s3Client } from '../connections/s3Connection';
import * as stream from 'stream';
import { awsConfig } from '../config/serverConfig';
import { publishUploadBookResult } from '../broker/books/publishers';
import { GetObjectOutput } from 'aws-sdk/clients/s3';
import { Readable } from 'stream';

import { uploadBookToS3 } from '../utils/books/uploadBookToS3';
import { uploadPages } from '../utils/books/uploadPages';

const uploadBook = async (req: Request, res: Response): Promise<void> => {
    const pass = new stream.PassThrough();
    const { book_id } = req.query;
    const chunks: Buffer[] = [];
    const id = uuid.v4();

    const coverImagePromise = new Promise(resolve => {
        pass.on('data', (chunk: Buffer) => {
            if (chunk.length) chunks.push(chunk);
        });

        pass.on('end', async () => {
            const fileBuffer = Buffer.concat(chunks);
            const image_cover_link = await uploadPages(fileBuffer, book_id as string);
            resolve(image_cover_link);
        });
    });

    // @ts-ignore
    req.file.pipe(pass);

    const bookLink = await uploadBookToS3(pass, `uploads/books/${book_id}/${id}`);

    await publishUploadBookResult({
        message: {
            book_id,
            book_link: bookLink,
        }
    });

    const cover_link = await coverImagePromise;

    res.json({
        book_link: bookLink,
        image_cover_link: cover_link,
    });
}

const getBookCover = async (req: Request, res: Response): Promise<void> => {
    const { book_id } = req.params;

    const params = {
        Bucket: awsConfig.bucketName,
        Key: `uploads/books/${book_id}/bookCover.png`,
    };

    const objectStream = await s3Client.getObject(params).promise() as GetObjectOutput;

    if (objectStream) {
        const stream = Readable.from(objectStream?.Body as Buffer);

        stream.pipe(res);
        stream.on('end', () => {
            res.end();
        });
    }
};

const getBookPage = async (req: Request, res: Response): Promise<void> => {
    const { book_id, page_number } = req.params;

    const params = {
        Bucket: awsConfig.bucketName,
        Key: `uploads/books/${book_id}/pages/${page_number}.pdf`,
    };

    const objectStream = await s3Client.getObject(params).promise() as GetObjectOutput;

    if (objectStream) {
        const stream = Readable.from(objectStream?.Body as Buffer);

        stream.pipe(res);
        stream.on('end', () => {
            res.end();
        });
    }
};

const uploadController = {
    getBookCover,
    getBookPage,
    uploadBook
};

export {
    uploadController,
};