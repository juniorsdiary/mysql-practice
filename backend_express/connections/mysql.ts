import mysql, { Connection } from 'mysql2/promise';

import { mysqlConfig } from '../config/serverConfig';
import { logger } from '../utils/logger';

let connection: Connection | undefined;

const getOrCreateMysqlConnection = async (): Promise<Connection | undefined> => {
    try {
        if (connection) return connection;
        connection = await mysql.createConnection({
            host: mysqlConfig.host,
            user: mysqlConfig.user,
            port: mysqlConfig.port,
            database: mysqlConfig.database,
            password: mysqlConfig.password,
            charset: 'UTF8MB4',
            connectionLimit: 10,
            waitForConnections: true,
            queueLimit: 0
        });
        return connection;
    } catch (e) {
        console.log(e);
        logger.error({ message: e.message })
    }

};

export {
    getOrCreateMysqlConnection,
}