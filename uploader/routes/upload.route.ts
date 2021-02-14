import express from "express";
import { uploadMiddleWare } from '../middlewares/uploadMiddleWare';
import { uploadController } from '../controllers/upload.controller';

const uploadRoute = express.Router();

uploadRoute.post(
    '/bookCover',
    uploadMiddleWare,
    uploadController.uploadBookCover
);

export {
    uploadRoute
}