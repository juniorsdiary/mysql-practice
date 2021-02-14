import { updateBook } from '../../helpers/mysql/books/updateBook';

export const consumeUploadCover = async (payload: any, data: any, channel: any) => {
    await updateBook({
        where: {
            book_id: payload.message.book_id
        },
        updateData: {
            image_cover_link: payload.message.imageCoverLink
        }
    });

    channel.ack(data);
}