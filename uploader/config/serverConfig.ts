const serverConfig = {
    uploaderPort: process.env.UPLOADER_PORT || 4000,
};

const awsConfig = {
    bucketName: 'mysqlpractice',
    region: ' us-east-1',
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
};

const rabbitConfig = {
    user: process.env.RABBIT_USER || 'randomString',
    pass: process.env.RABBIT_PASS || 'randomString',
    host: process.env.RABBIT_HOST || 'rabbit:5672',
}

export {
    serverConfig,
    awsConfig,
    rabbitConfig,
};