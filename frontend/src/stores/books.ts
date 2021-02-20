import { createEffect, createStore } from 'effector';
import { BookType, FetchBooksType } from '../types';

const initialState: { books: BookType[], count: number } = {
    books: [],
    count: 0,
};

export const getBooksFx = createEffect(async ({ skip, limit, orderDir, orderBy}: FetchBooksType): Promise<BookType[]> => {
    const res = await fetch(`http://localhost:3000/books?skip=${skip}&limit=${limit}&order=${orderDir || ''}&orderBy=${orderBy || ''}`);

    return res.json();
});

export const $books = createStore(initialState)
    .on(getBooksFx.doneData, (state, data) => ({ ...state, ...data }));
