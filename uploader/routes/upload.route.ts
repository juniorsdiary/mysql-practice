import express from "express";
import { uploadMiddleWare } from '../middlewares/uploadMiddleWare';
import { uploadController } from '../controllers/upload.controller';

const uploadRoute = express.Router();

uploadRoute.post(
    '/bookCover',
    uploadMiddleWare,
    uploadController.uploadBookCover
);

uploadRoute.post(
    '/book',
    uploadMiddleWare,
    uploadController.uploadBook
);

uploadRoute.get(
    '/bookCover/:book_id',
    uploadController.getBookCover
);

export {
    uploadRoute
}