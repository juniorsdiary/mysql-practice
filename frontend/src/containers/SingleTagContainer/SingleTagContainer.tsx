import React, { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStore } from 'effector-react';
import { $singleTag, getCertainTag } from '../../stores/singleTag';
import { TagType } from '../../types';
import { Box, List, ListItem, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        demo: {
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

const SingleTagContainer = (): JSX.Element => {
    const classes = useStyles();
    const { id } = useParams<any>();
    const singleTag = useStore<TagType>($singleTag);

    useEffect(() => {
        (async () => {
            await getCertainTag(id);
        })()
    }, []);

    const renderBooksList = useMemo(() => {
        return singleTag.books.map(book => (
                <ListItem button component={(props) => <Link to={`/books/${book.book_id}`} {...props} />} key={book.book_id}>
                    {book.title}
                </ListItem>
            )
        );
    }, [singleTag.books]);

    return (
        <>
            <Box display="inline-flex" flexDirection="column">
                <Box display="flex" alignItems="flex-end">
                    <Typography variant="h6">
                        Tag Name:&nbsp;{singleTag?.tag_name}
                    </Typography>
                </Box>
                <Typography>
                    Books:
                </Typography>
                <div className={classes.demo}>
                    <List dense>
                        {renderBooksList}
                    </List>
                </div>
            </Box>
        </>
    );
};

export { SingleTagContainer };