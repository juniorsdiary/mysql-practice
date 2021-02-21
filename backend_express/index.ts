import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { serverConfig } from './config/serverConfig';
import { logger } from './utils/logger';
import { booksRoute } from './routes/books.route';
import { authorsRoute } from './routes/authors.route';
import { initConsumers } from './broker';

import ROUTES_NAMES from './const/routes.names';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(ROUTES_NAMES.BOOKS, booksRoute);
app.use(ROUTES_NAMES.AUTHORS, authorsRoute);

(async () => {
    app.listen(serverConfig.backendPort, async () => {
        await initConsumers();

        logger.info(`Server is running http://localhost:${serverConfig.backendPort}`);
    });
})()