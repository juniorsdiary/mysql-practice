import React, {useEffect, useState} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ImageProps } from './types';
import Skeleton from '@material-ui/lab/Skeleton';
import { blobToDataUrl } from '../../utils/blobToDataUrl';

const useStyles = makeStyles((theme: Theme) => {
        console.log(theme);
        return createStyles({
            image: {
                display: 'block',
                width: (props: { width: number, height: number }) => `${props?.width}px`,
                height: (props: { width: number, height: number }) => `${props?.height}px`
            },
        });
    }
);

const Image: React.FunctionComponent<ImageProps> = ({ width, src, height }: ImageProps) => {
    const classes = useStyles({
        width: width || 0,
        height: height || 0,
    });

    const [loadedSrc, setLoadedSrc] = useState<any>()

    useEffect(() => {
        (async () => {
            if (src) {
                const source = await fetch(src);
                const blob = await source.blob();
                const dataUrl = await blobToDataUrl(blob);
                setLoadedSrc(dataUrl);
            }
        })()
    }, [src]);

    if (loadedSrc) {
        return (
            <img
                className={classes.image}
                src={loadedSrc}
                alt="book_cover"
                crossOrigin="anonymous"
            />
        );
    }

    return (
        <Skeleton
            variant="rect"
            width={width}
            height={height}
        />
    );
};

export { Image };