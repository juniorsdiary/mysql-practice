import React from 'react';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Box } from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import TableBody from "@material-ui/core/TableBody";
import { BookType, BookKeysEnum, AuthorKeysEnum } from "../../types";
import TablePagination from "@material-ui/core/TablePagination";
import TableContainer from "@material-ui/core/TableContainer";

import { createStyles, makeStyles } from "@material-ui/core/styles";

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

type DataTableType = {
    data: {
        columns: { tableHeadName: string; key: string }[];
        orderBy: string;
        orderDir: string;
        count: number;
        page: number;
        rowsPerPage: number;
        list: any[];
    }
    onChangeOrder: (key: string) => void;
    onChangePage: (newPage: number) => void;
    onChoosePage: (page: number) => void;
    onChangeRowsPerPage: (rowsPerPage: number) => void;
}

const DataTable = ({ data, onChangeOrder, onChangePage, onChangeRowsPerPage, onChoosePage }: DataTableType): JSX.Element => {
    const classes = useStyles();

    const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        onChangePage(newPage);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChangeRowsPerPage(parseInt(event.target.value, 10));
    }

    return (
        <TableContainer className={classes.tableContainer} component={Paper}>
            <Table className={classes.table} size="small">
                <TableHead>
                    <TableRow>
                        {data?.columns?.map(column => (
                            <TableCell key={column.key} className={classes.tableCell} align="left" onClick={() => onChangeOrder(column.key)}>
                                <Box display="flex" alignItems="center" >
                                    {column.tableHeadName}
                                    {data.orderBy === column.key && (data.orderDir === 'asc'
                                            ? <ExpandLessIcon  />
                                            : <ExpandMore />
                                    )}
                                </Box>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.list?.map((book: BookType) => (
                        <TableRow className={classes.tableRow} hover key={book.id} onClick={() => onChoosePage(book.id)}>
                            {data?.columns?.map(column => {
                                return (
                                    <TableCell key={column.key} align="left" className={classes.titleCell}>
                                        {book[column.key as BookKeysEnum & AuthorKeysEnum]}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                className={classes.paginateContainer}
                component="div"
                count={data?.count}
                page={data?.page}
                onChangePage={handleChangePage}
                rowsPerPage={data?.rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
};

export { DataTable };