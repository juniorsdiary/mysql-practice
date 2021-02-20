export type BookType = {
    book_id: number;
    title: string;
    pages: number;
    subtitle?: string;
    image_cover_link?: string;
    book_link?: string;
    authors?: AuthorType[];
    tags?: TagType[];
}

export type FetchBooksType = {
    skip: number;
    limit: number;
    orderDir?: string;
    orderBy?: string;
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
}