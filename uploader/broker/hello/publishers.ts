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

export const publishHelloWorld = createPublisher(publishData);
