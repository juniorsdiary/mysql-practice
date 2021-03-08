import React, { useCallback, useState } from 'react';
import { BookType } from '../../types';
import { DataTable } from '../DataTable/DataTable';
import { useHistory } from 'react-router-dom';

type BooksTableType =  {
    data: BookType[];
    count: number;
    onTableDataChange: (data: { page: number; rowsPerPage: number; order: string; orderBy: string }) => void
};

const BooksTable: React.FunctionComponent<BooksTableType> = ({ data = [], count, onTableDataChange }: BooksTableType) => {
    const history = useHistory();

    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    const [orderDir, setOrderDir] = useState<string>('asc');
    const [orderBy, setOrderBy] = useState<string>('');

    const handleChangePage = useCallback((newPage: number) => {
        setPage(newPage);
        onTableDataChange({ page: newPage, rowsPerPage, order: orderDir, orderBy });
    }, [page, rowsPerPage, orderDir, orderBy]);

    const handleChangeRowsPerPage = useCallback((rowsPerPage: number) => {
        setRowsPerPage(rowsPerPage);
        setPage(0);
        onTableDataChange({ page, rowsPerPage, order: orderDir, orderBy });
    }, [page, rowsPerPage, orderDir, orderBy]);

    const handleChoosePage = useCallback((bookId: number) => {
        history.push(`/books/${bookId}`);
    }, []);

    const handleChangeOrder = useCallback((orderByValue: string) => {
        const newOrderDir = orderDir === 'asc' ? 'desc' : 'asc';
        setOrderDir(newOrderDir);
        setOrderBy(orderByValue);
        onTableDataChange({
            page,
            rowsPerPage,
            order: newOrderDir,
            orderBy: orderByValue
        });
    }, [page, rowsPerPage, orderDir, orderBy]);

    return (
        <DataTable
            data={data}
            columns={[
                { tableHeadName: 'Title', key: 'title'},
                { tableHeadName: 'Description', key: 'subtitle'},
                { tableHeadName: 'Pages', key: 'pages'},
            ]}
            orderBy={orderBy}
            orderDir={orderDir}
            count={count}
            page={page}
            rowsPerPage={rowsPerPage}
            onChangeOrder={handleChangeOrder}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            onChoosePage={handleChoosePage}
        />
    );
};

export { BooksTable };