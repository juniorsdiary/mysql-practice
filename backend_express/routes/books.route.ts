import express from "express";
import { booksController } from '../controllers/books.controller';

const booksRoute = express.Router();

booksRoute.get('/', booksController.getBooks);
booksRoute.get('/:id', booksController.getBook);

export { booksRoute }
