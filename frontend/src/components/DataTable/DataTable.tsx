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

type ColumnType<T> = {
    tableHeadName: string;
    key: keyof T
}

type DataTableType<T> = {
    data: Array<T>;
    columns: Array<ColumnType<T>>;
    orderBy: string;
    orderDir: string;
    count: number;
    page: number;
    rowsPerPage: number;
    onChangeOrder: (key: string) => void;
    onChangePage: (newPage: number) => void;
    onChoosePage: (page: number) => void;
    onChangeRowsPerPage: (rowsPerPage: number) => void;
}

function DataTable<T extends { id: number; }>(props: DataTableType<T>): JSX.Element {
    const {
        data, columns, orderBy, orderDir, count, page,
        rowsPerPage, onChangeOrder, onChangePage, onChangeRowsPerPage, onChoosePage
    } = props;

    const classes = useStyles();

    const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        onChangePage(newPage);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChangeRowsPerPage(parseInt(event.target.value, 10));
    }

    return (
        <TableContainer
            className={classes.tableContainer}
            component={Paper}
        >
            <Table className={classes.table} size="small">
                <TableHead>
                    <TableRow>
                        {columns?.map(column => (
                            <TableCell
                                key={column.key as string}
                                className={classes.tableCell}
                                align="left"
                                onClick={() => onChangeOrder(column.key as string)}
                            >
                                <Box display="flex" alignItems="center" >
                                    {column.tableHeadName}
                                    {orderBy === column.key && (orderDir === 'asc'
                                            ? <ExpandLessIcon  />
                                            : <ExpandMore />
                                    )}
                                </Box>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map(item => (
                        <TableRow
                            hover
                            className={classes.tableRow}
                            key={item.id}
                            onClick={() => onChoosePage(item.id)}
                        >
                            {columns?.map(column => (
                                <TableCell key={column.key as string} align="left">
                                    {item[column.key]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                className={classes.paginateContainer}
                component="div"
                count={count}
                page={page}
                rowsPerPage={rowsPerPage}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}

export { DataTable };