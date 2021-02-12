import S3 from 'aws-sdk/clients/s3';
import { awsConfig } from '../config/serverConfig';

const s3Client = new S3({
    accessKeyId: awsConfig.accessKeyId,
    secretAccessKey: awsConfig.secretAccessKey,
});

export {
    s3Client,
}
