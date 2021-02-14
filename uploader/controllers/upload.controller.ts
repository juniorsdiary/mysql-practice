import { Request, Response } from 'express';
import { s3Client } from '../connections/s3Connection';
import * as stream from 'stream';
import { awsConfig } from '../config/serverConfig';
import { ManagedUpload } from 'aws-sdk/lib/s3/managed_upload';
import { publishUploadCoverResult, publishUploadBookResult } from '../broker/hello/publishers';

const uploadBookCover = async (req: Request, res: Response) => {
    const pass = new stream.PassThrough();
    const { book_id } = req.query;

    const params = {
        Bucket: awsConfig.bucketName,
        // @ts-ignore
        Key: `uploads/books/${book_id}/${req.fileName}`,
        Body: pass
    };

    s3Client.upload(params, (err: Error, data: ManagedUpload.SendData) => {
        publishUploadCoverResult({
            message: {
                book_id,
                image_cover_link: data.Location,
            }
        });
    });

    // @ts-ignore
    req.file.pipe(pass);

    res.end();
};

const uploadBook = (req: Request, res: Response) => {
    const pass = new stream.PassThrough();
    const { book_id } = req.query;

    const params = {
        Bucket: awsConfig.bucketName,
        // @ts-ignore
        Key: `uploads/books/${book_id}/${req.fileName}`,
        Body: pass
    };

    s3Client.upload(params, (err: Error, data: ManagedUpload.SendData) => {
        publishUploadBookResult({
            message: {
                book_id,
                book_link: data.Location,
            }
        });
    });

    // @ts-ignore
    req.file.pipe(pass);

    res.end();
}

const uploadController = {
    uploadBookCover,
    uploadBook
};

export {
    uploadController,
};