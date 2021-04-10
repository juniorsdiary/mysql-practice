import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import { serverConfig } from './config/serverConfig';
import { logger } from './utils/logger';
import { initConsumers } from './broker';
import { applyRoutes } from './routes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

applyRoutes(app);

(async () => {
    app.listen(serverConfig.backendPort, async () => {
        await initConsumers();
        logger.info(`Server is running http://localhost:${serverConfig.backendPort}`);
    });
})()