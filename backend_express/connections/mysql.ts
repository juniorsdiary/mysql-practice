import mysql, { Pool } from 'mysql2';

import { mysqlConfig } from '../config/serverConfig';
import {logger} from "../utils/logger";

let pool: Pool | undefined;

const getOrCreateMysqlConnection = (): Pool | undefined => {
    if (pool) return pool;
    logger.info('Create pool for mysql');
    return mysql.createPool({
        connectionLimit: 5,
        host: mysqlConfig.host,
        user: mysqlConfig.user,
        database: mysqlConfig.database,
        password: mysqlConfig.password
    });
};

export {
    getOrCreateMysqlConnection
}