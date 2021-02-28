import React, {useEffect, useMemo} from 'react';
import { useStore } from 'effector-react';
import {Link, useParams} from 'react-router-dom';
import { $singleAuthor, getCertainAuthor } from '../../stores/singleAuthor';
import { AuthorType, BookType } from '../../types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {List, ListItem} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        input: {
            display: 'none',
        },
        button: {
            margin: theme.spacing(1),
        },
        subtitle: {
            fontWeight: 600,
        }
    }),
);

const SingleAuthorContainer = (): JSX.Element => {
    const classes = useStyles();

    const { id } = useParams<any>();
    const singleAuthor = useStore<AuthorType>($singleAuthor);

    useEffect(() => {
        (async () => {
            await getCertainAuthor(id);
        })()
    }, []);

    const renderBooksList = useMemo(() => {
        return singleAuthor?.books?.map((book: BookType) => (
                <ListItem button component={(props) => <Link to={`/books/${book.book_id}`} {...props} />} key={book.book_id}>
                    {book.title}
                </ListItem>
            )
        );
    }, [singleAuthor.books]);

    return (
        <>
            <Box display="flex" flexDirection="column">
                <Box display="flex" alignItems="center">
                    <Typography display='inline' className={classes.subtitle} variant="subtitle1" noWrap>
                        First Name:&nbsp;
                    </Typography>
                    <Typography display='inline' noWrap>
                        {singleAuthor.first_name}
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                    <Typography display='inline' className={classes.subtitle} variant="subtitle1" noWrap>
                        Last Name:&nbsp;
                    </Typography>
                    <Typography display='inline' noWrap>
                        {singleAuthor?.last_name}
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                    <Typography display='inline' className={classes.subtitle} variant="subtitle1" noWrap>
                        Middle Name:&nbsp;
                    </Typography>
                    <Typography display='inline' noWrap>
                        {singleAuthor?.middle_name || '-'}
                    </Typography>
                </Box>
                <Box display="flex" flexDirection={'column'}>
                    <Typography display='inline' className={classes.subtitle} variant="subtitle1" noWrap>
                        Books:&nbsp;
                    </Typography>
                    <List dense>
                        {renderBooksList}
                    </List>
                </Box>
            </Box>
        </>
    );
};

export { SingleAuthorContainer };