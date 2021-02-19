import { Request, Response } from 'express';
import { s3Client } from '../connections/s3Connection';
import * as stream from 'stream';
import { awsConfig } from '../config/serverConfig';
import { ManagedUpload } from 'aws-sdk/lib/s3/managed_upload';
import { publishUploadBookResult } from '../broker/hello/publishers';
import { GetObjectOutput } from 'aws-sdk/clients/s3';
import { Readable } from 'stream';
import { PDFDocument, PDFPage } from 'pdf-lib';

const uploadBook = (req: Request, res: Response) => {
    const pass = new stream.PassThrough();
    const { book_id } = req.query;
    const chunks: any[] = [];

    const params = {
        Bucket: awsConfig.bucketName,
        // @ts-ignore
        Key: `uploads/books/${book_id}/${req.fileName}`,
        Body: pass
    };

    s3Client.upload(params, async (err: Error, data: ManagedUpload.SendData) => {
        await publishUploadBookResult({
            message: {
                book_id,
                book_link: data.Location,
            }
        });

        res.end();
    });

    pass.on('data', (chunk: Buffer) => {
        if (chunk.length) {
            chunks.push(chunk);
        }
    });

    pass.on('end', async () => {
        const fileBuffer = Buffer.concat(chunks);
        const initialDocument = await PDFDocument.load(fileBuffer);

        const uploadPages = initialDocument.getPages().map(async (page: PDFPage, i: number) => {
                const docForPage = await PDFDocument.create();
                const [newPage] = await docForPage.copyPages(initialDocument, [i]);
                docForPage.addPage(newPage);
                const docBytes = await docForPage.save();
                const pageBuffer = Buffer.from(docBytes.buffer)
                const stream = Readable.from(pageBuffer);

                const params = {
                    Bucket: awsConfig.bucketName,
                    // @ts-ignore
                    Key: `uploads/books/${book_id}/pages/${i}.pdf`,
                    Body: stream
                };

                s3Client.upload(params);
        });

        await Promise.all(uploadPages);
    });

    // @ts-ignore
    req.file.pipe(pass);
}

const getBookCover = async (req: Request, res: Response) => {
    const { book_id } = req.params;

    const params = {
        Bucket: awsConfig.bucketName,
        Key: `uploads/books/${book_id}/sign.png`,
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
    uploadBook
};

export {
    uploadController,
};