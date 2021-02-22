import express from "express";
import { tagsController } from '../controllers/tags.controller';

const tagsRoute = express.Router();

tagsRoute.get('/', tagsController.getTags);
tagsRoute.get('/:id', tagsController.getTag);

export {
    tagsRoute
};
