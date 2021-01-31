import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { serverConfig } from './config/serverConfig';
import { getOrCreateMysqlConnection } from './connections/mysql';
import { logger } from './utils/logger';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});

(async () => {
    logger.info('Create mysql connection');
    await getOrCreateMysqlConnection();

    app.listen(serverConfig.backendPort, () => {
        logger.info(`Server is running http://localhost:${serverConfig.backendPort}`);
    });
})()