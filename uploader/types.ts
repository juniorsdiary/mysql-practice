import { Request, Response } from 'express';
import { Stream } from "stream";

export interface FileRequest extends Request {
    file: Stream
}