import { uploadToS3 } from '../s3/uploadToS3';

const uploadCoverToS3 = async (buffer: Buffer | undefined, key: string): Promise<string | undefined>=> {
    if (buffer) {
        const data = await uploadToS3(buffer, key);
        return data.Location;
    }
    return;
}

export {
    uploadCoverToS3,
}