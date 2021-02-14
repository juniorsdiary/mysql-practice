import React, { useRef, ChangeEvent, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useStore } from "effector-react";

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { $singleBook, getCertainBook, uploadBookImage } from '../../stores/singleBook';
import { BookType } from "../../types";

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
    }),
);

const SingleBookContainer = () => {
    const classes = useStyles();
    const singleBook = useStore<BookType>($singleBook);
    let { id } = useParams<any>();
    const uploadCoverRef = useRef() as React.RefObject<HTMLInputElement> | null | undefined;

    useEffect(() => {
        (async () => {
            await getCertainBook(id);
        })()
    }, []);

    const handleUploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const formData = new FormData();

        const file = e?.target?.files?.length && e?.target?.files[0];
        if (file) {
            formData.append('bookCover', file, file?.name);
            await uploadBookImage({ id, data: formData });
        }
    }

    return (
        <>
            <Toolbar />
            <Box display="flex">
                <Typography variant="h3" noWrap>
                    {singleBook.title}
                </Typography>
                <div className={classes.root}>
                    <input
                        className={classes.input}
                        ref={uploadCoverRef}
                        id="cover-button-file"
                        type="file"
                        onChange={handleUploadFile}
                    />
                    <label htmlFor="cover-button-file">
                        <Button
                            variant="contained"
                            color="default"
                            component="span"
                            className={classes.button}
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload Cover Image
                        </Button>
                    </label>
                    <input
                        className={classes.input}
                        id="pdf-button-file"
                        type="file"
                        onChange={handleUploadFile}
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
            <Typography variant="subtitle1" noWrap>
                {singleBook.subtitle}
            </Typography>
        </>
    );
};

export { SingleBookContainer };