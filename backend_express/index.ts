import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { serverConfig } from './config/serverConfig';
import { logger } from './utils/logger';
import { booksRoute } from './routes/books.route';

import ROUTES_NAMES from './const/routes.names';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(ROUTES_NAMES.BOOKS, booksRoute);

app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});

(async () => {
    app.listen(serverConfig.backendPort, () => {
        logger.info(`Server is running http://localhost:${serverConfig.backendPort}`);
    });
})()