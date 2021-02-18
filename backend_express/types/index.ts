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
}