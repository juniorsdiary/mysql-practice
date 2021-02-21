import React, { useState, useEffect } from 'react';
import { useStore } from 'effector-react';
import { useHistory } from 'react-router-dom';

// store
import { $books, getBooksFx } from '../../stores/books';

// types
import { DataTable } from '../../components/DataTable/DataTable';

const BooksContainer: React.FunctionComponent = () => {
    const history = useHistory();

    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    const [orderDir, setOrderDir] = useState<string>('asc');
    const [orderBy, setOrderBy] = useState<string>('');

    const booksStore = useStore($books);

    useEffect(() => {
        getBooksFx({ skip: page * rowsPerPage, limit: rowsPerPage });
    }, []);

    useEffect(() => {
        getBooksFx({
            skip: page * rowsPerPage,
            limit: rowsPerPage,
            orderDir,
            orderBy
        });
    }, [page, rowsPerPage, orderDir, orderBy]);

    const handleChangePage = (newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (rowsPerPage: number) => {
        setRowsPerPage(rowsPerPage);
        setPage(0);
    };

    const handleChoosePage = (bookId: number) => {
        history.push(`/books/${bookId}`);
    };

    const handleChangeOrder = (orderByValue: string) => {
        setOrderDir(orderDir === 'asc' ? 'desc' : 'asc');
        setOrderBy(orderByValue);
    };

    return (
        <>
            <DataTable
                data={{
                    columns: [
                        { tableHeadName: 'Title', key: 'title'},
                        { tableHeadName: 'Description', key: 'subtitle'},
                        { tableHeadName: 'Pages', key: 'pages'},
                    ],
                    orderBy,
                    orderDir,
                    count: booksStore.count,
                    page,
                    rowsPerPage,
                    list: booksStore.books,
                }}
                onChangeOrder={handleChangeOrder}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                onChoosePage={handleChoosePage}
            />
        </>
    );
}

export { BooksContainer }