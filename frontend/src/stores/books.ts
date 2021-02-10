import { createEffect, createStore } from 'effector';
import { BookType, FetchBooksType } from '../types';

const initialState: { books: BookType[], currentBook: BookType | null; count: number } = {
    books: [],
    currentBook: null,
    count: 0,
};

export const getBooksFx = createEffect(async ({ skip, limit }: FetchBooksType): Promise<BookType[]> => {
    const res = await fetch(`http://localhost:3000/books?skip=${skip}&limit=${limit}`);

    return res.json();
});

export const getCertainBook = createEffect(async (id: number) => {
    const res = await fetch(`http://localhost:3000/books/${id}`);

    return res.json();
});

export const $books = createStore(initialState)
    .on(getBooksFx.doneData, (state, data) => ({ ...state, ...data }))
    .on(getCertainBook.doneData, (state, data) => ({ ...state, ...data }));