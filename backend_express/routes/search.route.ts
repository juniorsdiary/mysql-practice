import express from "express";
import { searchController } from '../controllers/search.controller';

const searchRoute = express.Router();

searchRoute.get('/', searchController.getResult);

export {
    searchRoute
};