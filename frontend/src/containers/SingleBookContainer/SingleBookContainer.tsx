import React, { ChangeEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from 'effector-react';

// material ui
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
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

const SingleBookContainer = () => {
    const classes = useStyles();
    const singleBook = useStore<BookType>($singleBook);
    let { id } = useParams<any>();

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

    return (
        <>
            <Toolbar />
            <Box display="flex">
                <Box display="flex" flexDirection={'column'}>
                    <Typography variant="h3" noWrap>
                        {singleBook.title}
                    </Typography>
                    {singleBook.book_id && singleBook.image_cover_link
                        ? <PdfView sourceDocument={`http://localhost:4000/upload/getBookPage/${singleBook.book_id}/0`} />
                        : <Skeleton
                            variant="rect"
                            width={600}
                            height={800}
                        />
                    }
                </Box>
                <div className={classes.root}>
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