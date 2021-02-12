import express from "express";
import { uploadController } from '../controllers/upload.controller';

const uploadRoute = express.Router();

uploadRoute.get('/book', uploadController.uploadBook);

export {
    uploadRoute
}