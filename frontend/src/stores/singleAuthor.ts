import { AuthorType } from '../types';
import { createApi, createEffect, createStore } from 'effector';

const initialState: AuthorType = {
    id: 0,
    author_id: 0,
    first_name: '',
    last_name: '',
    middle_name: '',
    books: [],
};

export const getCertainAuthor = createEffect(async (id: number) => {
    const res = await fetch(`http://localhost:3000/authors/${id}`);

    return res.json();
});

export const $singleAuthor = createStore<AuthorType>(initialState)
    .on(getCertainAuthor.pending, () => initialState)
    .on(getCertainAuthor.doneData, (_, data) => data)

export const singleAuthorApi = createApi($singleAuthor, {
    setAuthor: (state, data) => setAuthor(state, data)
});

const setAuthor = (_: AuthorType, author: AuthorType) => author;

getCertainAuthor.finally.watch((data) => {
    if (data.status === "fail" && data.error) {
        console.log('handler rejected', data.error);
    }
    if (data.status === "done" && data.result) {
        singleAuthorApi.setAuthor(data.result);
    }
})