import { uploadToS3 } from '../s3/uploadToS3';
import { Stream } from 'stream';

const uploadBookToS3 = async (data: Stream | Buffer, key: string): Promise<string> => {
    const uploadedResult = await uploadToS3(data, key);

    return uploadedResult.Location;
}

export {
    uploadBookToS3
};