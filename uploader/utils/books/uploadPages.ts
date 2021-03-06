import { PDFDocument, PDFPage } from 'pdf-lib';
import { Readable } from 'stream';
import { pdf2png } from '../pdf2png';
import { uploadCoverToS3 } from './uploadCoverToS3';
import { publishUploadCoverResult } from '../../broker/books/publishers';
import { uploadToS3 } from '../s3/uploadToS3';

const uploadPages = async (buffer: Buffer, bookId: string): Promise<void> => {
    const initialDocument = await PDFDocument.load(buffer);

    const uploadPages = initialDocument.getPages().map(async (_: PDFPage, i: number) => {
        const docForPage = await PDFDocument.create();
        const [newPage] = await docForPage.copyPages(initialDocument, [i]);
        docForPage.addPage(newPage);
        const docBytes = await docForPage.save();
        const pageBuffer = Buffer.from(docBytes.buffer);
        const stream = Readable.from(pageBuffer);

        if (i === 0) {
            const image = await pdf2png(pageBuffer);
            const coverLink = await uploadCoverToS3(image, `uploads/books/${bookId}/bookCover.png`);

            await publishUploadCoverResult({
                message: {
                    book_id: bookId,
                    image_cover_link: coverLink,
                }
            });
        }

        await uploadToS3(stream, `uploads/books/${bookId}/pages/${i}.pdf`);
    });

    await Promise.all(uploadPages);
}

export {
    uploadPages
}