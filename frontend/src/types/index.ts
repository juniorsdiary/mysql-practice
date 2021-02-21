export type BookType = {
    id: number;
    title: string;
    pages: number;
    subtitle?: string;
    image_cover_link?: string;
    book_link?: string;
    authors?: AuthorType[];
    tags?: TagType[];
}

export enum BookKeysEnum {
    id = 'id',
    title = 'title',
    pages = 'pages',
    subtitle = 'subtitle',
    book_link = 'book_link',
    authors = 'authors',
    tags = 'tags',
}

export enum AuthorKeysEnum {
    first_name = 'first_name',
    last_name = 'last_name',
    middle_name = 'middle_name',
}

export type FetchBooksType = {
    skip: number;
    limit: number;
    orderDir?: string;
    orderBy?: string;
}

export type AuthorType = {
    id: number;
    first_name: string;
    last_name: string;
    middle_name: string;
}

export type TagType = {
    tag_id: number;
    tag_name: string;
}