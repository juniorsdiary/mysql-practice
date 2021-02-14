import { connectAndGetChannel } from '../connections/rabbit';
import { initUploadCoverConsumers } from './upload/consumers';

export const initConsumers = async() => {
    const connection = await connectAndGetChannel();
    await initUploadCoverConsumers({ connection });
};
