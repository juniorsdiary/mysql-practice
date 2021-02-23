import React, { ChangeEvent, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useStore } from 'effector-react';

// material ui
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// components
import { PdfView } from '../../components/PdfView/PdfView';

// stores
import { $singleBook, getCertainBook, uploadBook } from '../../stores/singleBook';

// types
import { BookType } from '../../types';

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

    return (
        <>
            <Box display="flex">
                <Box display="flex" flexDirection={'column'}>
                    <Typography variant="h3" noWrap>
                        {singleBook.title}
                    </Typography>
                    {singleBook.book_id && singleBook.book_link &&
                        <PdfView sourceDocument={`http://localhost:4000/upload/getBookPage/${singleBook.book_id}`} page={0} />
                    }
                </Box>
                <div className={classes.root}>
                    {singleBook.book_link ? (
                        <Button onClick={handleReadBook} variant="contained" color='primary'>
                            Read Book
                        </Button>
                    ) : (
                        <>
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
                    )}
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
            <Box>
                <Typography display='inline' className={classes.subtitle} variant="subtitle1" noWrap>
                    Authors:
                </Typography>
                &nbsp;
                <Typography display='inline' noWrap>
                    {singleBook?.authors?.map(author => `${author.first_name} ${author.middle_name || ''} ${author.last_name}`).join(', ') || 'No Authors'}
                </Typography>
            </Box>
            <Box>
                <Typography display='inline' className={classes.subtitle} variant="subtitle1" noWrap>
                    Tags:
                </Typography>
                &nbsp;
                <Typography display='inline' noWrap>
                    {singleBook?.tags?.map(tag => tag.tag_name).join(', ') || 'No Tags'}
                </Typography>
            </Box>
        </>
    );
};

export { SingleBookContainer };