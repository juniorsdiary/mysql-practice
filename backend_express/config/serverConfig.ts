const serverConfig = {
    backendPort: process.env.BACKEND_PORT || 3000,
};

const mysqlConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_ROOT_PASSWORD,
};

export {
    serverConfig,
    mysqlConfig
};