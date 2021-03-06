import React, { useRef, useState, useEffect, useCallback } from 'react';
import * as PDFjs from 'pdfjs-dist';
import { PDFPageProxy, RenderParameters } from 'pdfjs-dist/types/display/api';

import Skeleton from '@material-ui/lab/Skeleton';

import { PdfViewProps } from './types';
import { blobToDataUrl } from '../../utils/blobToDataUrl';

const PdfView: React.FunctionComponent<PdfViewProps> = ({ sourceDocument, page }: PdfViewProps) => {
    const [documentSource, setDocumentSource] = useState<string | null | undefined>('');
    const renderCanvas = useRef<HTMLCanvasElement>(null);

    const handleGetDocumentSource = useCallback(async (path: string) => {
        const documentResponse = await fetch(path);
        const blob = await documentResponse.blob();
        const dataUrl = await blobToDataUrl(blob);
        setDocumentSource(dataUrl);
    }, []);

    useEffect(() => {
        PDFjs.GlobalWorkerOptions.workerSrc = '//cdn.jsdelivr.net/npm/pdfjs-dist@2.6.347/build/pdf.worker.js';
    }, []);

    useEffect(() => {
        handleGetDocumentSource(`${sourceDocument}/${page}`);
    }, [sourceDocument, page]);

    useEffect(() => {
        (async () => {
            if (documentSource) {
                const loadingTask = PDFjs.getDocument(documentSource);
                const data = await loadingTask.promise;
                const page: PDFPageProxy = await data.getPage(1);

                const viewport = page.getViewport({ scale: 1 });

                const canvas = renderCanvas.current;
                const context = canvas?.getContext('2d');

                canvas && (canvas.height = viewport.height);
                canvas && (canvas.width = viewport.width);

                if (context) {
                    const renderContext: RenderParameters = {
                        canvasContext: context,
                        viewport,
                    };

                    page.render(renderContext);
                }
            }
        })()
    }, [documentSource]);

    return (
        documentSource
        ? <canvas
            width={600}
            height={800}
            ref={renderCanvas}
        />
        : <Skeleton
            variant="rect"
            width={600}
            height={800}
        />
        );

};

export { PdfView };