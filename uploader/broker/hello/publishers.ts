import config from '../../config/rabbit';

const {
    exchanges: {
        HELLO: {
            name: exchangeName,
            queues: {
                WORLD,
            },
        },
    }
} = config;

import { createPublisher } from '../createPublisher';
import { IPublishData } from '../../types';

const publishData = {
    exchangeName,
    queue: WORLD,
} as IPublishData;

const publishUploadCoverData = {
    exchangeName: config.exchanges.UPLOAD_RESULT.name,
    queue: config.exchanges.UPLOAD_RESULT.queues.UPLOAD_COVER,
} as IPublishData;

export const publishHelloWorld = createPublisher(publishData);
export const publishUploadCoverResult = createPublisher(publishUploadCoverData);
