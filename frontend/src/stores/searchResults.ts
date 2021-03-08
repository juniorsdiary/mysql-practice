import { createEffect, createStore } from 'effector';

type SearchResultsStore = {
    result: any[];
    count: number;
};

type SearchParamsType = {
    title?: string;
    author?: string;
    skip?: number;
    limit?: number;
    order?: string;
    orderBy?: string;
};

const initialStore = {
    result: [],
    count: 0
};

export const searchDataFx = createEffect(async ({ title, author, skip, limit, order, orderBy }: SearchParamsType) => {
    const titleQuery = title ? `title=${title}` : '';
    const authorQuery = author ? `author=${author}` : '';
    const skipQuery = `skip=${skip}`;
    const limitQuery = limit ? `limit=${limit}` : '';
    const orderQuery = order ? `order=${order}` : '';
    const orderByQuery = orderBy ? `orderBy=${orderBy}` : '';

    const commonQuery = [titleQuery, authorQuery, skipQuery, limitQuery, orderQuery, orderByQuery].filter(q => q).join('&');

    const res = await fetch(`http://localhost:3000/search?${commonQuery}`);

    return res.json();
})

export const $searchResults = createStore<SearchResultsStore>(initialStore)
    .on(searchDataFx.doneData, (_, data) => ({ result: data.data, count: data.count }));

