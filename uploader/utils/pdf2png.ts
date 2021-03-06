import Canvas from 'canvas';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.js';
const pdfjsLib = require("pdfjs-dist/es5/build/pdf.js");
import { logger } from "./logger";
import { RenderParameters } from "pdfjs-dist/types/display/api";

// Some PDFs need external cmaps.
const CMAP_URL = "../../../node_modules/pdfjs-dist/cmaps/";

type CanvasAndContextType = {
    canvas: Canvas.Canvas,
    context: Canvas.CanvasRenderingContext2D
}

const createCanvasContext = (width: number, height: number): CanvasAndContextType => {
    const canvas = Canvas.createCanvas(width, height);
    const context = canvas.getContext("2d");
    return {
        canvas,
        context,
    };
};

const pdf2png = async (pdfPageBuffer: Buffer): Promise<Buffer | undefined> => {
    try {
        const arrayBuffer = new Uint8Array(pdfPageBuffer);

        // Load the PDF file.
        const loadingTask = pdfjsLib.getDocument({
            data: arrayBuffer,
            cMapUrl: CMAP_URL,
            cMapPacked: true,
        });

        const pdfDocument = await loadingTask.promise;
        // Get the first page.
        const page = await pdfDocument.getPage(1);
        // Render the page on a Node canvas with 100% scale.
        const viewport = page.getViewport({ scale: 1.0 });

        const canvasAndContext = createCanvasContext(viewport.width, viewport.height);

        const renderContext: RenderParameters = {
            canvasContext: canvasAndContext.context,
            viewport,
        };

        const renderTask = page.render(renderContext);
        await renderTask.promise;

        return canvasAndContext?.canvas?.toBuffer();
    } catch (e) {
        logger.error({ message: e });
    }
};

export { pdf2png }