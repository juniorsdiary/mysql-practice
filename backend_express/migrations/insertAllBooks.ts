import { getOrCreateTag } from '../helpers/mysql/tags/getOrCreateTag';
import { getOrCreateBook } from '../helpers/mysql/books/getOrCreateBook';
import { getOrCreateAuthor } from '../helpers/mysql/authors/getOrCreateAuthor';
import { getOrCreateBookAuthor } from '../helpers/mysql/bookAuthor/getOrCreateBookAuthor';
import { getOrCreateBookTag } from '../helpers/mysql/bookTag/getOrCreateBookTag';
import { executePromiseQueue } from "../utils/executePromiseQueue";
import { data } from '../data/books';

const insertBooks = async () => {
    const insertPromises = data.map((book) => async () => {
        const bookResult = await getOrCreateBook(book);
        const insertAuthorsPromise = book.authors.map((author) => async () => {
            const authorResult = await getOrCreateAuthor(author);
            const tag = await getOrCreateTag(book.tag);
            await getOrCreateBookAuthor({
                book_id: bookResult.insertId || bookResult.book_id,
                author_id: authorResult.insertId || authorResult.author_id,
            });
            await getOrCreateBookTag({
                book_id: bookResult.insertId || bookResult.book_id,
                tag_id: tag.insertId || tag.tag_id,
            });
        })
        return await executePromiseQueue(insertAuthorsPromise);
    });

    await executePromiseQueue(insertPromises);
};

export { insertBooks };