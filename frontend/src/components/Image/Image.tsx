import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ImageProps } from './types';

const useStyles = makeStyles((theme: Theme) => {
        console.log(theme)
        return createStyles({
            image: {
                display: 'block',
                width: (props: { width: number, height: number }) => `${props?.width}px`,
                height: (props: { width: number, height: number }) => `${props?.height}px`
            },
        });
    }
);

const Image = ({ width, src, height }: ImageProps) => {
    const classes = useStyles({
        width: width || 0,
        height: height || 0,
    });

    if (Boolean(src)) {
        return (
            <img
                className={classes.image}
                src={src}
                alt="book_cover"
                crossOrigin="anonymous"
            />
        );
    }
    return null;
};

export { Image };