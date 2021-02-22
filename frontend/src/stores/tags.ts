import { createStore, createEffect } from 'effector';
import { FetchEntityType, TagsStateType } from '../types';

const initialState: TagsStateType = {
    tags: [],
    count: 0
}

export const getTagsFx = createEffect(async ({ skip, limit, orderDir, orderBy}: FetchEntityType): Promise<TagsStateType> => {
    const res = await fetch(`http://localhost:3000/tags?skip=${skip}&limit=${limit}&order=${orderDir || ''}&orderBy=${orderBy || ''}`);

    return res.json();
});

export const $tags = createStore<TagsStateType>(initialState)
    .on(getTagsFx.doneData, (state, data) => ({ ...state, tags: data.data, count: data.count }));

