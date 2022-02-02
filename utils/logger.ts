import pino from 'pino';

const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'UTC:yyyy-mm-dd +HH:MM',
            ignore: 'pid,hostname',
        },
    },
});

export default logger;
