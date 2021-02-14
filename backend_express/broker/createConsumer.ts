import { wrapMsgPayloadWithCatch } from '../utils/wrapMsgPayloadWithCatch';
import { Connection } from 'amqplib';

interface ICreateConsumer {
    connection: Connection;
    queueName: string;
    handler: (payload: any, data: any, channel: any) => Promise<void>;
    prefetch: number;
}

export async function createConsumer({
     connection, queueName, handler, prefetch,
 }: ICreateConsumer) {
    const channel = await connection.createChannel();

    await channel.prefetch(prefetch, true);

    await channel.consume(queueName, wrapMsgPayloadWithCatch(handler, channel));
}
