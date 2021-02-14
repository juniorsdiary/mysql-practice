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

const rabbitConfig = {
    user: process.env.RABBIT_USER || 'randomString',
    pass: process.env.RABBIT_PASS || 'randomString',
    host: process.env.RABBIT_HOST || 'rabbit:5672',
}

export {
    serverConfig,
    mysqlConfig,
    rabbitConfig,
};