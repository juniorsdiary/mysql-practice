import React, { useState, useEffect } from 'react';
import { useStore } from "effector-react";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

// components
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

// store
import { $books, getBooksFx, getCertainBook } from '../../stores/books';

// types
import { BookType } from '../../types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        drawer: {
            width: 200,
            flexShrink: 0,
        },
        drawerPaper: {
            width: 200,
        },
        drawerContainer: {
            overflow: 'auto',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        table: {
            maxWidth: 800,
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
        }
    }),
);

function BooksContainer() {
    const classes = useStyles();
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    const booksStore = useStore($books);

    useEffect(() => {
        (async () => {
            await getBooksFx({ skip: page * rowsPerPage, limit: rowsPerPage });
        })();
    }, []);

    useEffect(() => {
        getBooksFx({
            skip: page * rowsPerPage,
            limit: rowsPerPage
        });
    }, [page, rowsPerPage]);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Books Reader
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <List>
                        {['Books', 'Authors', 'Tags'].map((text) => (
                            <ListItem button key={text}>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
            <main className={classes.content}>
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
                                <TableRow className={classes.tableRow} hover key={book.book_id}>
                                    <TableCell className={classes.titleCell} component="th" scope="row">
                                        {book.title}
                                    </TableCell>
                                    <TableCell align="left">{book.subtitle}</TableCell>
                                    <TableCell align="left">{book.pages}</TableCell>
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
            </main>
        </div>
    );
}

export { BooksContainer }