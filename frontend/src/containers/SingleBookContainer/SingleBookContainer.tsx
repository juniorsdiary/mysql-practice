import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';

import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    }),
);

const SingleBookContainer = () => {
    const classes = useStyles();

    return (
        <>
            <Toolbar />
            book
        </>
    );
};

export { SingleBookContainer };