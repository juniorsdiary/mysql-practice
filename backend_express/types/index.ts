export type BookType = {
    book_id: number;
    title: string;
    subtitle: string;
    pages: number;
}

export type AuthorType = {
    author_id: number;
    first_name: string;
    last_name: string;
    middle_name: string;
}

export type TagType = {
    tag_id: number;
    tag_name: string;
    books?: BookType[];
}

export type GetEntityArgs = {
    skip: number;
    limit: number;
    order?: string;
    orderBy?: string;
}

export type SelectEntityResponse = {
    data: BookType[] | AuthorType[] | TagType[];
    count: number;
}

export type TagsResponseType = {
    tags: TagType[];
    count: number;
};

export type BuildSelectQueryArgsType = {
    tableName: string;
    skip?: number;
    limit?: number;
    order?: string;
    orderBy?: string;
};