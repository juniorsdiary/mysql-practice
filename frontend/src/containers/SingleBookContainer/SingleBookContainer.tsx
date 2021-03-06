import React, { useMemo, ChangeEvent, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useStore } from 'effector-react';

// material ui
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { List, ListItem } from '@material-ui/core';

// components
import { Image } from '../../components/Image/Image';

// stores
import { $singleBook, getCertainBook, uploadBook } from '../../stores/singleBook';

// types
import { AuthorType, BookType, TagType } from '../../types';

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

const SingleBookContainer = (): JSX.Element => {
    const classes = useStyles();
    const history = useHistory();
    const singleBook = useStore<BookType>($singleBook);
    const { id } = useParams<any>();

    useEffect(() => {
        (async () => {
            await getCertainBook(id);
        })()
    }, []);

    const handleUploadBook = async (e: ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData();

        const file = e?.target?.files?.length && e?.target?.files[0];
        if (file) {
            formData.append('book', file, file?.name);
            await uploadBook({ id, data: formData });
        }
    }

    const handleReadBook = () => {
        history.push(`/books/${id}/reader`);
    }

    const renderAuthorsList = useMemo(() => {
        return singleBook?.authors?.map((author: AuthorType) => {
            return (
                <ListItem button component={(props) => <Link to={`/authors/${author.author_id}`} {...props} />} key={author.author_id}>
                    {`${author.first_name} ${author.middle_name || ''} ${author.last_name}`}
                </ListItem>
            );
        });
    }, [singleBook?.authors]);

    const renderTagsList = useMemo(() => {
        return singleBook?.tags?.map((tag: TagType) => {
            return (
                <ListItem button component={(props) => <Link to={`/tags/${tag.tag_id}`} {...props} />} key={tag.tag_id}>
                    {tag.tag_name}
                </ListItem>
            );
        }) || 'No Tags';
    }, [singleBook?.tags]);

    return (
        <>
            <Box display="flex">
                <Box display="flex" flexDirection={'column'}>
                    <Typography variant="h3" noWrap>
                        {singleBook.title}
                    </Typography>
                    {singleBook.book_id && singleBook.image_cover_link &&
                        <Image
                            src={`http://localhost:4000/upload/getBookCover/${singleBook.book_id}`}
                            width={600}
                            height={800}
                        />
                    }
                </Box>
                <div className={classes.root}>
                    <>
                        <Button onClick={handleReadBook} variant="contained" color='primary'>
                            Read Book
                        </Button>
                        <input
                            accept="application/pdf"
                            className={classes.input}
                            id="pdf-button-file"
                            type="file"
                            onChange={handleUploadBook}
                        />
                        <label htmlFor="pdf-button-file">
                            <Button
                                variant="contained"
                                color="default"
                                component="span"
                                className={classes.button}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload Book
                            </Button>
                        </label>
                    </>
                </div>
            </Box>
            <Box>
                <Typography display='inline' className={classes.subtitle} variant="subtitle1" noWrap>
                    Subtitle:
                </Typography>
                &nbsp;
                <Typography display='inline' noWrap>
                    {singleBook.subtitle}
                </Typography>
            </Box>
            <Box display="inline-flex" flexDirection="column">
                <Typography display='inline' className={classes.subtitle} variant="subtitle1" noWrap>
                    Authors:
                </Typography>
                <List dense>
                    {renderAuthorsList}
                </List>
            </Box>
            <Box display="inline-flex" flexDirection="column">
                <Typography display='inline' className={classes.subtitle} variant="subtitle1" noWrap>
                    Tags:
                </Typography>
                <List dense>
                    {renderTagsList}
                </List>
            </Box>
        </>
    );
};

export {
    SingleBookContainer
};