import React, { ChangeEvent, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useStore } from "effector-react";

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
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
    }),
);

const SingleBookContainer = () => {
    const classes = useStyles();
    const singleBook = useStore<BookType>($singleBook);
    let { id } = useParams<any>();

    useEffect(() => {
        getCertainBook(id);
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
            <Typography variant="h3" noWrap>
                {singleBook.title}
            </Typography>
            <Typography variant="subtitle1" noWrap>
                {singleBook.subtitle}
            </Typography>
            <div className={classes.root}>
                <input
                    className={classes.input}
                    id="icon-button-file"
                    type="file"
                    onChange={handleUploadFile}
                />
                <label htmlFor="icon-button-file">
                    <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                    >
                        <PhotoCamera />
                    </IconButton>
                </label>
            </div>
        </>
    );
};

export { SingleBookContainer };