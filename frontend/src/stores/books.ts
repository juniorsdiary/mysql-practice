import { createEffect, createStore } from 'effector';
import { FetchEntityType, BooksStateType } from '../types';

const initialState: BooksStateType = {
    books: [],
    count: 0,
};

export const getBooksFx = createEffect(async ({ skip, limit, orderDir, orderBy}: FetchEntityType): Promise<BooksStateType> => {
    const skipQuery = skip ? `skip=${skip}` : '';
    const limitQuery = limit ? `limit=${limit}` : '';
    const orderQuery = orderDir ? `order=${orderDir}` : '';
    const orderByQuery = orderBy ? `orderBy=${orderBy}` : '';

    const res = await fetch(`http://localhost:3000/books?${skipQuery}&${limitQuery}&${orderQuery}&${orderByQuery}`);

    return res.json();
});

export const $books = createStore(initialState)
    .on(getBooksFx.doneData, (state, data) => ({ ...state, books: data.data, count: data.count }));
