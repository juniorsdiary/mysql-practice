import { createEffect, createStore } from 'effector';
import { FetchEntityType, BooksStateType } from '../types';

const initialState: BooksStateType = {
    books: [],
    count: 0,
};

export const getBooksFx = createEffect(async ({ skip, limit, orderDir, orderBy}: FetchEntityType): Promise<BooksStateType> => {
    const res = await fetch(`http://localhost:3000/books?skip=${skip}&limit=${limit}&order=${orderDir || ''}&orderBy=${orderBy || ''}`);

    return res.json();
});

export const $books = createStore(initialState)
    .on(getBooksFx.doneData, (state, data) => ({ ...state, books: data.data, count: data.count }));
