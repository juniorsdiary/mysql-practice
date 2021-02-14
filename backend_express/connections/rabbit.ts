import process from 'process';
import amqp, { Connection } from 'amqplib';
import { rabbitConfig } from '../config/serverConfig';
import config from '../config/rabbit';
import { logger } from '../utils/logger';

const { user, host, pass } = rabbitConfig;

let connectionState: any = null;

async function initExchanges(connection: Connection) {
    const channel = await connection.createChannel();

    channel.on('error', (e: any) => {
        logger.error(e.message);
        process.exit();
    });

    const exchanges = Object.values(config.exchanges);

    const promiseExchanges = exchanges.map(async (e: any) => {
        await channel.assertExchange(e.name, e.type, e.options);
        const queues = Object.values(e.queues);
        const promiseQueues = queues.map(async (q: any) => {
            await channel.assertQueue(q.name, q.options);
            await channel.bindQueue(q.name, e.name, q.binding);
        });
        return Promise.all(promiseQueues);
    });

    await Promise.all(promiseExchanges);

    await channel.close();
}

async function connectAngGetConnection(): Promise<any> {
    const connection: Connection = await amqp.connect(`amqp://${user}:${pass}@${host}`);

    connection.on('error', (e: any) => {
        logger.error(e.message);
        process.exit();
    });

    connection.on('blocked', (reason: any) => {
        logger.error(`Rabbit connection block by ${reason}`);
        process.exit();
    });

    await initExchanges(connection);
    return connection;
}

export const connectAndGetChannel = () => {
    if (!connectionState) {
        connectionState = connectAngGetConnection();
    }
    return connectionState;
};
