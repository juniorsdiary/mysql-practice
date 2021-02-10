const serverConfig = {
    backendPort: process.env.BACKEND_PORT || 3000,
};

const externalPort = process.env.MYSQL_PORT as string;

const mysqlConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port: parseInt(externalPort, 10),
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_ROOT_PASSWORD,
};

const awsConfig = {
    bucketName: 'mysqlpractice',
    region: ' us-east-1',
    accessKeyId: 'AKIAVOGE3243T44OSFGW',
    secretAccessKey: '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'
};

export {
    serverConfig,
    mysqlConfig,
    awsConfig,
};