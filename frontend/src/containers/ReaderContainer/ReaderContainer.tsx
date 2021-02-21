import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from 'effector-react';

// stores
import { $singleBook, getCertainBook } from '../../stores/singleBook';

// components
import { PdfView } from '../../components/PdfView/PdfView';

// material
import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/lab/Pagination';
import Toolbar from '@material-ui/core/Toolbar';

// types
import { BookType } from '../../types';

const ReaderContainer = () => {
    const singleBook = useStore<BookType>($singleBook);
    const { id } = useParams<any>();

    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        (async () => {
            await getCertainBook(id);
        })();
    }, []);

    const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    }

    return (
        <>
            <Toolbar />
            <Box>
                <PdfView
                    sourceDocument={`http://localhost:4000/upload/getBookPage/${singleBook.id}`}
                    page={page}
                />
                <Pagination
                    count={singleBook.pages}
                    page={page}
                    onChange={handleChange}
                />
            </Box>
        </>
    );
};

export { ReaderContainer };