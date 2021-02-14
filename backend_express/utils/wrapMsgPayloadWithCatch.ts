import { logger } from './logger';

export function wrapMsgPayloadWithCatch(func: CallableFunction, channel: any | null = null) {
    return (msg: any) => {
        const jsonBody = msg.content.toString();
        const body = JSON.parse(jsonBody);
        func(body, msg, channel).catch((e: Error) => {
            setTimeout(() => {
                const message = `\t*1.Stack*:\n\t${e.stack}`
                    + '\n\t*2.Message info*:'
                    + `\n\t  *exchange*: ${msg.fields.exchange}`
                    + `\n\t  *routingKey*: ${msg.fields.routingKey}`
                    + `\n\t  *redelivered*: ${msg.fields.redelivered}`
                    + `\n\t*3.Message data*:\n${JSON.stringify(body, null, '   ')}`
                    + `\n\t*4.Error*:\n\t${e.message}\n`;
                logger.error(message);
                if (channel) channel.nack(msg);
            }, 10000);
        });
    };
}
