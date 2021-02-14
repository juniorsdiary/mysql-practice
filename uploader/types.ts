import { Request, Response } from 'express';
import { Stream } from "stream";

export interface FileRequest extends Request {
    file: Stream
}

interface IQueue {
    [prop: string]: any
}


export interface IPublishData {
    exchangeName: string;
    queue: IQueue;
    expiration?: string;
    persistent?: boolean
}
