import { createStore, createEffect } from 'effector';
import { FetchEntityType, AuthorsStateType } from '../types';

const initialState: AuthorsStateType = {
    authors: [],
    count: 0,
};

export const getAuthorsFx = createEffect(async ({ skip, limit, orderDir, orderBy}: FetchEntityType): Promise<AuthorsStateType> => {
    const res = await fetch(`http://localhost:3000/authors?skip=${skip}&limit=${limit}&order=${orderDir || ''}&orderBy=${orderBy || ''}`);

    return res.json();
});

export const $authors = createStore<AuthorsStateType>(initialState)
    .on(getAuthorsFx.doneData, (state, data) => ({ ...state, authors: data.data, count: data.count }));
