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
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

// store
import { $books, getBooksFx } from '../../stores/books';

// types
import { BookType } from '../../types';
import {Box} from "@material-ui/core";

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
        },
        tableCell: {
            cursor: 'pointer',
        }
    }),
);

const BooksContainer: React.FunctionComponent = () => {
    const history = useHistory();

    const classes = useStyles();
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

    const handleChangeOrder = (orderByValue: string) => {
        setOrderDir(orderDir === 'asc' ? 'desc' : 'asc');
        setOrderBy(orderByValue);
    };

    return (
        <>
            <Toolbar />
            <TableContainer className={classes.tableContainer} component={Paper}>
                <Table className={classes.table} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableCell} align="left" onClick={() => handleChangeOrder('title')}>
                                <Box display="flex" alignItems="center" >
                                    Title
                                    {orderBy === 'title' && (orderDir === 'asc'
                                        ? <ExpandLessIcon  />
                                        : <ExpandMore />
                                    )}
                                </Box>
                            </TableCell>
                            <TableCell className={classes.tableCell} align="left" onClick={() => handleChangeOrder('subtitle')}>
                                <Box display="flex" alignItems="center">
                                    Description
                                    {orderBy === 'subtitle' && (
                                        orderDir === 'asc'
                                        ? <ExpandLessIcon  />
                                        : <ExpandMore />
                                    )}
                                </Box>
                            </TableCell>
                            <TableCell className={classes.tableCell} align="left" onClick={() => handleChangeOrder('pages')}>
                                <Box display="flex" alignItems="center">
                                    Pages
                                    {orderBy === 'pages' && (orderDir === 'asc'
                                        ? <ExpandLessIcon  />
                                        : <ExpandMore />
                                    )}
                                </Box>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {booksStore.books.map((book: BookType) => (
                            <TableRow className={classes.tableRow} hover key={book.book_id} onClick={() => handleChoosePage(book.book_id)}>
                                <TableCell className={classes.titleCell}>
                                    {book.title}
                                </TableCell>
                                <TableCell align="left">
                                    {book.subtitle}
                                </TableCell>
                                <TableCell align="left" >
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