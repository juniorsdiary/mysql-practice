import { updateBook } from '../../helpers/mysql/books/updateBook';

export const consumeUploadCover = async (payload: any, data: any, channel: any) => {
    await updateBook({
        where: {
            book_id: payload.message.book_id
        },
        updateData: {
            image_cover_link: payload.message.image_cover_link
        }
    });

    channel.ack(data);
}

export const consumeUploadBook = async (payload: any, data: any, channel: any) => {
    await updateBook({
        where: {
            book_id: payload.message.book_id
        },
        updateData: {
            book_link: payload.message.book_link
        }
    });

    channel.ack(data);
}