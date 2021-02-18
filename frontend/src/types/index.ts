export type BookType = {
    book_id: number;
    title: string;
    subtitle: string;
    pages: number;
    image_cover_link?: string;
    book_link?: string;
}

export type FetchBooksType = {
    skip: number;
    limit: number;
}