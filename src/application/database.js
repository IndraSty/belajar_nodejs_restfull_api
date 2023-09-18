import { PrismaClient } from "@prisma/client";
import { logger } from "./logging.js";

//setup orm
export const prismaClient = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'event',
            level: 'error',
        },
        {
            emit: 'event',
            level: 'info',
        },
        {
            emit: 'event',
            level: 'warn',
        },
    ],
});


//mengirim event ke logger
prismaClient.$on('error', (e) => {
    logger.error(e);
});

prismaClient.$on('warn', (e) => {
    logger.warn(e);
});

prismaClient.$on('info', (e) => {
    logger.info(e);
});

prismaClient.$on('query', (e) => {
    logger.info(e);
});