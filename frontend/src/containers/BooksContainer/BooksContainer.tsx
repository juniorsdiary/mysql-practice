import React, { useEffect, useCallback } from 'react';
import { useStore } from 'effector-react';

// store
import { $books, getBooksFx } from '../../stores/books';

// components
import { BooksTable } from '../../components/BooksTable/BooksTable';

const BooksContainer: React.FunctionComponent = () => {
    const booksStore = useStore($books);

    useEffect(() => {
        getBooksFx({
            skip: 10,
            limit: 10
        });
    }, []);

    const handleTableDataChange = useCallback(({ page, rowsPerPage, orderDir, orderBy }) => {
        getBooksFx({
            skip: page * rowsPerPage,
            limit: rowsPerPage,
            orderDir,
            orderBy
        });
    }, []);

    return (
        <>
            <BooksTable
                data={booksStore.books || []}
                count={booksStore.count}
                onTableDataChange={handleTableDataChange}
            />
        </>
    );
}

export {
    BooksContainer
};