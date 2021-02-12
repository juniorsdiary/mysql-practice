import winston, { format } from 'winston';

const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, label, timestamp, service, ...rest }) => (
    `[${service}] ${new Date(timestamp).toString()} ${level}: ${message} ${JSON.stringify({...rest })}`
));

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        winston.format.colorize(),
        timestamp(),
        myFormat
    ),
    defaultMeta: { service: 'uploader-service' },
});

logger.add(new winston.transports.Console());

export {
    logger,
}