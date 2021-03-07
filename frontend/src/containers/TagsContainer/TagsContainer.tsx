import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useStore } from 'effector-react';

import { DataTable } from '../../components/DataTable/DataTable';

import { $tags, getTagsFx } from '../../stores/tags';
import {TagType} from "../../types";

const TagsContainer = (): JSX.Element => {
    const history = useHistory();

    const tagsStore = useStore($tags);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [orderDir, setOrderDir] = useState<string>('asc');
    const [orderBy, setOrderBy] = useState<string>('');

    useEffect(() => {
        getTagsFx({
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
        history.push(`/tags/${authorId}`);
    };

    const handleChangeOrder = (orderByValue: string) => {
        setOrderDir(orderDir === 'asc' ? 'desc' : 'asc');
        setOrderBy(orderByValue);
    };

    return (
        <>
            <DataTable<TagType>
                data={tagsStore.tags || []}
                columns={[
                    { tableHeadName: 'Tag id', key: 'tag_id'},
                    { tableHeadName: 'Tag Name', key: 'tag_name'},
                    { tableHeadName: 'Books', key: 'books'},
                ]}
                count={tagsStore.count}
                orderBy={orderBy}
                orderDir={orderDir}
                page={page}
                rowsPerPage={rowsPerPage}
                onChangeOrder={handleChangeOrder}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                onChoosePage={handleChoosePage}
            />
        </>
    );
};

export { TagsContainer };