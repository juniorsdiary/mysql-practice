import React, { useEffect, useRef, useState } from 'react';
import { ImageProps } from './types';
import Skeleton from '@material-ui/lab/Skeleton';
import { blobToDataUrl } from '../../utils/blobToDataUrl';

const Image: React.FunctionComponent<ImageProps> = ({ width, src, height }: ImageProps) => {
    const imageRef = useRef<HTMLImageElement>(null);

    const [loadedSrc, setLoadedSrc] = useState<any>();
    const [naturalWidth, setNaturalWidth] = useState<number>(0);
    const [naturalHeight, setNaturalHeight] = useState<number>(0);

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

    const handleImageLoaded = () => {
        setNaturalWidth(imageRef?.current?.naturalWidth || 0);
        setNaturalHeight(imageRef?.current?.naturalHeight || 0)
    };

    if (loadedSrc) {
        return (
            <img
                width={naturalWidth}
                height={naturalHeight}
                ref={imageRef}
                onLoad={handleImageLoaded}
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

export {
    Image
};