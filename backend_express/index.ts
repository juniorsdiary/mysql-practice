import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { serverConfig } from './config/serverConfig';
import { insertBooks } from './migrations/insertAllBooks';
import { logger } from './utils/logger';
import { booksRoute } from './routes/books.route';
import { uploadRoute } from './routes/upload.route';

import ROUTES_NAMES from './const/routes.names';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(ROUTES_NAMES.BOOKS, booksRoute);
app.use(ROUTES_NAMES.UPLOAD, uploadRoute);

(async () => {
    // await insertBooks();
    app.listen(serverConfig.backendPort, () => {
        logger.info(`Server is running http://localhost:${serverConfig.backendPort}`);
    });
})()