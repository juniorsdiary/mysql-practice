export type BookType = {
    book_id: number;
    title: string;
    subtitle: string;
    pages: number;
}

export type FetchBooksType = {
    skip: number;
    limit: number;
}