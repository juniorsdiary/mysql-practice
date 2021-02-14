export const consumeUploadCover = (payload: any, data: any, channel: any) => {
    console.log(payload);

    channel.ack(data);
}