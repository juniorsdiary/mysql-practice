import { connectAndGetChannel } from '../connections/rabbit';

export const initConsumers = async() => {
    const connection = await connectAndGetChannel();
};
