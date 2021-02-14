export async function consumeHelloWorld(payload: any, data: any, channel: any) {
    console.log('hello world');
    console.log(payload);
    console.log(data);

    channel.ack(data);
}
