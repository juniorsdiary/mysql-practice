import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { serverConfig } from './config/serverConfig';
import { insertBooks } from './migrations/insertAllBooks';
import { logger } from './utils/logger';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello. This is backend with express');
});

(async () => {
    // await insertBooks();

    app.listen(serverConfig.backendPort, () => {
        logger.info(`Server is running http://localhost:${serverConfig.backendPort}`);
    });
})()