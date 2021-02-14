import { Connection } from 'amqplib';
import { createConsumer } from '../createConsumer';
import { consumeUploadCover } from './controller';
import config from '../../config/rabbit';

const { exchanges: { UPLOAD_RESULT } } = config;

export function initUploadCoverConsumers({ connection }: { connection: Connection; }) {
    return Promise.all([
        createConsumer({
            connection,
            handler: consumeUploadCover,
            queueName: UPLOAD_RESULT.queues.UPLOAD_COVER.name,
            prefetch: 50,
        }),
    ]);
}