import { TagType } from '../types';
import { createApi, createEffect, createStore } from 'effector';

const initialState: TagType = {
    id: 0,
    tag_id: 0,
    tag_name: '',
    books: [],
};

export const getCertainTag = createEffect(async (id: number) => {
    const res = await fetch(`http://localhost:3000/tags/${id}`);

    return res.json();
});

export const $singleTag = createStore<TagType>(initialState)
    .on(getCertainTag.pending, () => initialState)
    .on(getCertainTag.doneData, (_, data) => data)

export const singleTagApi = createApi($singleTag, {
    setAuthor: (state, data) => setAuthor(state, data)
});

const setAuthor = (_: TagType, tag: TagType) => tag;

getCertainTag.finally.watch((data) => {
    if (data.status === "fail" && data.error) {
        console.log('handler rejected', data.error);
    }
    if (data.status === "done" && data.result) {
        singleTagApi.setAuthor(data.result);
    }
})