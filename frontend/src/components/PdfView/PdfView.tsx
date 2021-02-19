import React, { useRef, useState, useEffect } from 'react';
import * as PDFjs from 'pdfjs-dist';
import {PDFPageProxy} from "pdfjs-dist/types/display/api";

type PdfViewProps = {
    sourceDocument: string;
}

const PdfView = ({ sourceDocument }: PdfViewProps) => {
    const [documentSource, setDocumentSource] = useState<string | ArrayBuffer | null | undefined>('');
    const renderCanvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        PDFjs.GlobalWorkerOptions.workerSrc = '//cdn.jsdelivr.net/npm/pdfjs-dist@2.6.347/build/pdf.worker.js';
        (async () => {
            const documentResponse = await fetch(sourceDocument);
            const blob = await documentResponse.blob();
            const reader = new FileReader();

            reader.onload = function(evt: ProgressEvent<FileReader>) {
                setDocumentSource(evt?.target?.result)
            };

            reader.readAsDataURL(blob);
        })()
    }, []);

    useEffect(() => {
        (async () => {
            if (documentSource) {
                // @ts-ignore
                const loadingTask = PDFjs.getDocument(documentSource);
                const data = await loadingTask.promise;
                const page: PDFPageProxy = await data.getPage(1);

                const viewport = page.getViewport({ scale: 1 });
                const canvas = renderCanvas.current;
                const context = canvas?.getContext('2d');

                canvas && (canvas.height = viewport.height);
                canvas && (canvas.width = viewport.width);

                const renderContext = {
                    canvasContext: context,
                    viewport,
                };

                // @ts-ignore
                page.render(renderContext);
            }
        })()
    }, [documentSource]);

    return <canvas ref={renderCanvas} />;
};

export { PdfView };