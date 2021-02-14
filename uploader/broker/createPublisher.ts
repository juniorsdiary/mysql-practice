import { objectToJsonBuffer } from '../utils/objectToJsonBuffer';
import { connectAndGetChannel } from '../connections/rabbit';
import { IPublishData } from '../types';
import { Channel } from "amqplib";

let channelPromise: Channel;

export function createPublisher({
    exchangeName,
    queue,
    expiration: dExpiration,
    persistent: dPersistent = true,
}: IPublishData) {
    return async (data: any, { persistent = dPersistent, expiration = dExpiration } = {}) => {
        const connection = await connectAndGetChannel();

        if (!channelPromise) {
            channelPromise = connection.createChannel();
        }

        const channel: Channel = await channelPromise;
        const payload: Buffer = objectToJsonBuffer(data);

        channel.publish(
            exchangeName,
            queue.binding,
            payload,
            { persistent, expiration },
        );
    };
}
