import React, { useEffect, useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { $authors, getAuthorsFx } from '../../stores/authors';

import { useStore } from 'effector-react';
import { DataTable } from '../../components/DataTable/DataTable';
import { useHistory } from 'react-router-dom';

const AuthorsContainer: React.FunctionComponent = () => {
    const history = useHistory();

    const authorsStore = useStore($authors);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [orderDir, setOrderDir] = useState<string>('asc');
    const [orderBy, setOrderBy] = useState<string>('');

    useEffect(() => {
        (async () => {
            await getAuthorsFx({
                skip: page * rowsPerPage,
                limit: rowsPerPage
            });
        })();
    }, []);

    useEffect(() => {
        getAuthorsFx({
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
        setPage(page);
    };

    const handleChoosePage = (authorId: number) => {
        history.push(`/authors/${authorId}`);
    };

    const handleChangeOrder = (orderByValue: string) => {
        setOrderDir(orderDir === 'asc' ? 'desc' : 'asc');
        setOrderBy(orderByValue);
    };

    return (
        <div>
            <Toolbar />
            <DataTable
                data={{
                    columns: [
                        { tableHeadName: 'First Name', key: 'first_name'},
                        { tableHeadName: 'Middle Name', key: 'middle_name'},
                        { tableHeadName: 'Last Name', key: 'last_name'},
                    ],
                    orderBy,
                    orderDir,
                    count: authorsStore.count,
                    page,
                    rowsPerPage,
                    list: authorsStore.authors,
                }}
                onChangeOrder={handleChangeOrder}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                onChoosePage={handleChoosePage}
            />
        </div>
    );
};

export { AuthorsContainer };