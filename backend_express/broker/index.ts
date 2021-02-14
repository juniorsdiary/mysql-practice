import { connectAndGetChannel } from '../connections/rabbit';
import { initUploadCoverConsumers, initUploadBookConsumers } from './upload/consumers';

export const initConsumers = async() => {
    const connection = await connectAndGetChannel();
    await initUploadCoverConsumers({ connection });
    await initUploadBookConsumers({ connection });
};
