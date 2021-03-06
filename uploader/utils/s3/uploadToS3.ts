import S3 from 'aws-sdk/clients/s3';
import { awsConfig } from '../../config/serverConfig';
import { s3Client } from '../../connections/s3Connection';
import { ManagedUpload } from 'aws-sdk/lib/s3/managed_upload';
import { Stream } from 'stream';

const uploadToS3 = async (data: Buffer | Stream, key: string): Promise<ManagedUpload.SendData> => {
    const params: S3.PutObjectRequest = {
        Bucket: awsConfig.bucketName,
        Key: key,
        Body: data
    };
    return new Promise((resolve, reject) => {
        s3Client.upload(params, (err: Error, data: ManagedUpload.SendData) => {
            if (err) reject(err);
            resolve(data)
        });
    });
};

export {
    uploadToS3
};