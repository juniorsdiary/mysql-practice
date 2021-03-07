export type BookType = {
    id: number;
    book_id: number;
    title: string;
    pages: number;
    subtitle?: string;
    image_cover_link?: string;
    book_link?: string;
    authors?: AuthorType[];
    tags?: TagType[];
};

export type AuthorType = {
    id: number;
    author_id: number;
    first_name: string;
    last_name: string;
    middle_name: string;
    books?: BookType[];
};

export type TagType = {
    id: number;
    tag_id: number;
    tag_name: string;
    books: BookType[];
};

export type FetchEntityType = {
    skip: number;
    limit: number;
    orderDir?: string;
    orderBy?: string;
};

export type AuthorsStateType = {
    authors?: AuthorType[];
    data?: AuthorType[];
    count: number;
};

export type TagsStateType = {
    tags?: TagType[];
    data?: TagType[];
    count: number;
};

export type BooksStateType = {
    books?: BookType[];
    data?: BookType[];
    count: number;
};
