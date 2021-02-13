import { Request, Response } from 'express';
import { s3Client } from "../connections/s3Connection";
import * as stream from "stream";
import { awsConfig } from "../config/serverConfig";
import { ManagedUpload } from "aws-sdk/lib/s3/managed_upload";

const uploadBookCover = (req: Request, res: Response) => {
    const pass = new stream.PassThrough();
    const { book_id } = req.query;
    // @ts-ignore
    const params = {Bucket: awsConfig.bucketName, Key: `uploads/books/${book_id}/${req.fileName}`, Body: pass };

    s3Client.upload(params, function(err: Error, data: ManagedUpload.SendData) {
        if (err) console.log(err)
        console.log(data);
    });

    // @ts-ignore
    req.file.pipe(pass);

    res.end();
};

const uploadBook = () => {

}

const uploadController = {
    uploadBookCover,
    uploadBook
};

export {
    uploadController,
};