import { BookType } from '../types';
import { createApi, createEffect, createStore } from 'effector';

const initialState = {
    book_id: 0,
    title: '',
    subtitle: '',
    pages: 0,
};

export const getCertainBook = createEffect(async (id: number) => {
    const res = await fetch(`http://localhost:3000/books/${id}`);

    return res.json();
});

export const uploadBookImage = createEffect(async (params: any) => {
    const res = await fetch(`http://localhost:4000/upload/bookCover?book_id=${params.id}`, {
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
    .on(getCertainBook.doneData, (state, data) => data)
    .on(uploadBookImage.doneData, (state, data) => data)
    .on(uploadBook.doneData, (state, data) => data);

export const singleBookApi = createApi($singleBook, {
    setBook: (state, data) => setBook(state, data)
});

const setBook = (state: BookType, book: BookType) => state.book_id !== book.book_id ? book : state;

// @ts-ignore
getCertainBook.finally.watch(({ result, error }) => {
    if (error) {
        console.log('handler rejected', error)
    } else {
        singleBookApi.setBook(result);
    }
})