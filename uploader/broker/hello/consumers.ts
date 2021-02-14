import { createConsumer } from '../createConsumer';
import { consumeHelloWorld } from './controller';
import config from "../../config/rabbit";
import { Connection } from "amqplib";

const { exchanges: { HELLO } } = config;

export function initHelloConsumers({ connection }: { connection: Connection; }) {
    return Promise.all([
        createConsumer({
            connection,
            handler: consumeHelloWorld,
            queueName: HELLO.queues.WORLD.name,
            prefetch: 50,
        }),
    ]);
}
