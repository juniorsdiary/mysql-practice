import express from 'express';
import { authorsController } from '../controllers/authors.controller';

const authorsRoute = express.Router();

authorsRoute.get('/', authorsController.getAuthors);
authorsRoute.get('/:id', authorsController.getAuthor);

export { authorsRoute };