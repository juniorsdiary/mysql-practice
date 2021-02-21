import { createStore, createEffect } from 'effector';
import { AuthorType, FetchBooksType } from '../types';

const initialState: { authors: AuthorType[], count: number } = {
    authors: [],
    count: 0,
}

export const getAuthorsFx = createEffect(async ({ skip, limit, orderDir, orderBy}: FetchBooksType): Promise<AuthorType[]> => {
    const res = await fetch(`http://localhost:3000/authors?skip=${skip}&limit=${limit}&order=${orderDir || ''}&orderBy=${orderBy || ''}`);

    return res.json();
});

export const $authors = createStore(initialState)
    .on(getAuthorsFx.doneData, (state, data) => ({ ...state, ...data }));