import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import busboy from 'connect-busboy';

import { serverConfig } from './config/serverConfig';
import { logger } from './utils/logger';
import { uploadRoute } from './routes/upload.route';

import ROUTES_NAMES from './const/routes.names';

const app = express();

app.use(cors());
app.use(busboy());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(ROUTES_NAMES.UPLOAD, uploadRoute);

(async () => {
    app.listen(serverConfig.uploaderPort, () => {
        logger.info(`Uploader is running http://localhost:${serverConfig.uploaderPort}`);
    });
})()