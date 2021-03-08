import React, { useCallback, useState } from 'react';
import { useStore } from 'effector-react';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

// stores
import { $searchResults, searchDataFx } from '../../stores/searchResults';

import { BooksTable } from '../../components/BooksTable/BooksTable';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        inputWrapper: {
            margin: '0 5px',
        },
        submitButton: {
            margin: '0 5px',
        }
    }),
);

const SearchContainer: React.FunctionComponent = () => {
    const searchResults = useStore($searchResults);

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');

    const classes = useStyles();

    const handleChangeTitle = useCallback(({ target: { value }}: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(value);
    }, []);

    const handleChangeAuthor = useCallback(({ target: { value }}: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAuthor(value);
    }, []);

    const handleSearch = useCallback(async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        return await searchDataFx({
            title,
            author,
            skip: 0,
            limit: 10
        });
    }, [title, author]);

    const handleTableDataChange = useCallback(async (data) => {
        await searchDataFx({
            title,
            author,
            skip: data.page * data.rowsPerPage,
            limit: data.rowsPerPage,
            order: data.order,
            orderBy: data.orderBy,
        });
    }, [title, author]);

    return (
        <>
            <form
                className={classes.root}
                noValidate
                autoComplete="off"
                onSubmit={handleSearch}
            >
                <Box
                    display="flex"
                    alignItems="center"
                >
                    <FormControl className={classes.inputWrapper}>
                        <InputLabel
                            htmlFor="title"
                        >
                            Title
                        </InputLabel>
                        <Input
                            id="title"
                            value={title}
                            onChange={handleChangeTitle}
                        />
                    </FormControl>

                    <FormControl className={classes.inputWrapper}>
                        <InputLabel
                            htmlFor="author"
                        >
                            Author
                        </InputLabel>
                        <Input
                            id="author"
                            value={author}
                            onChange={handleChangeAuthor}
                        />
                    </FormControl>

                    <Button
                        className={classes.submitButton}
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={handleSearch}
                    >
                        Search
                    </Button>
                </Box>
            </form>
            <BooksTable
                data={searchResults.result}
                count={searchResults.count}
                onTableDataChange={handleTableDataChange}
            />
        </>
    );
};

export {
    SearchContainer
};