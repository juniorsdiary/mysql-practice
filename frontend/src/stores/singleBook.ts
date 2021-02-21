import { BookType } from '../types';
import { createApi, createEffect, createStore } from 'effector';

const initialState = {
    id: 0,
    title: '',
    subtitle: '',
    pages: 0,
};

export const getCertainBook = createEffect(async (id: number) => {
    const res = await fetch(`http://localhost:3000/books/${id}`);

    return res.json();
});

export const uploadBookImage = createEffect(async (params: any) => {
    const res = await fetch(`http://localhost:4000/upload/bookCover?id=${params.id}`, {
        method: 'POST',
        body: params.data,
    });

    return res.json();
});

export const uploadBook = createEffect(async (params: any) => {
    const res = await fetch(`http://localhost:4000/upload/book?book_id=${params.id}`, {
        method: 'POST',
        body: params.data,
    });

    return res.json();
});

export const $singleBook = createStore<BookType>(initialState)
    .on(getCertainBook.pending, () => initialState)
    .on(getCertainBook.doneData, (_, data) => data)
    .on(uploadBookImage.doneData, (_, data) => data)
    .on(uploadBook.doneData, (state, data) => ({...state, book_link: data.book_link }));

export const singleBookApi = createApi($singleBook, {
    setBook: (state, data) => setBook(state, data)
});

const setBook = (state: BookType, book: BookType) => state.id !== book.id ? book : state;

getCertainBook.finally.watch((data) => {
    if (data.status === "fail" && data.error) {
        console.log('handler rejected', data.error);
    }
    if (data.status === "done" && data.result) {
        singleBookApi.setBook(data.result);
    }
})