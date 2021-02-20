import React, { useState, useEffect } from 'react';
import { useStore } from 'effector-react';
import { useHistory } from 'react-router-dom';

import { createStyles, makeStyles } from '@material-ui/core/styles';

// components
import Toolbar from '@material-ui/core/Toolbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

// store
import { $books, getBooksFx } from '../../stores/books';

// types
import { BookType } from '../../types';

const useStyles = makeStyles(() =>
    createStyles({
        table: {
            maxWidth: 800,
            flex: '1 1',
        },
        titleCell: {
            fontWeight: 600
        },
        tableRow: {
            cursor: 'pointer',
        },
        paginateContainer: {
            maxWidth: 800,
        },
        tableContainer: {
            maxWidth: 800,
            minHeight: 600,
            display: 'flex',
            flexDirection: 'column'
        }
    }),
);

const BooksContainer: React.FunctionComponent = () => {
    const history = useHistory();

    const classes = useStyles();
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    const booksStore = useStore($books);

    useEffect(() => {
        getBooksFx({ skip: page * rowsPerPage, limit: rowsPerPage });
    }, []);

    useEffect(() => {
        getBooksFx({
            skip: page * rowsPerPage,
            limit: rowsPerPage
        });
    }, [page, rowsPerPage]);

    const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChoosePage = (bookId: number) => {
        history.push(`/books/${bookId}`);
    };

    return (
        <>
            <Toolbar />
            <TableContainer className={classes.tableContainer} component={Paper}>
                <Table className={classes.table} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Pages</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {booksStore.books.map((book: BookType) => (
                            <TableRow className={classes.tableRow} hover key={book.book_id} onClick={() => handleChoosePage(book.book_id)}>
                                <TableCell className={classes.titleCell} component="th" scope="row">
                                    {book.title}
                                </TableCell>
                                <TableCell align="left">
                                    {book.subtitle}
                                </TableCell>
                                <TableCell align="left">
                                    {book.pages}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    className={classes.paginateContainer}
                    component="div"
                    count={booksStore.count}
                    page={page}
                    onChangePage={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>
        </>
    );
}

export { BooksContainer }