const serverConfig = {
    uploaderPort: process.env.UPLOADER_PORT || 4000,
};

const awsConfig = {
    bucketName: 'mysqlpractice',
    region: ' us-east-1',
    accessKeyId: 'AKIAVOGE3243T44OSFGW',
    secretAccessKey: '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'
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