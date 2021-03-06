import config from '../../config/rabbit';
import { createPublisher } from '../createPublisher';
import { IPublishData } from '../../types';

const publishUploadCoverData = {
    exchangeName: config.exchanges.UPLOAD_RESULT.name,
    queue: config.exchanges.UPLOAD_RESULT.queues.UPLOAD_COVER,
} as IPublishData;

const publishUploadBookData = {
    exchangeName: config.exchanges.UPLOAD_RESULT.name,
    queue: config.exchanges.UPLOAD_RESULT.queues.UPLOAD_BOOK,
} as IPublishData;

export const publishUploadCoverResult = createPublisher(publishUploadCoverData);
export const publishUploadBookResult = createPublisher(publishUploadBookData);
