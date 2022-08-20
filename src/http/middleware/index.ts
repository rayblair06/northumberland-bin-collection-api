import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { logger } from './logger';


export const unhandledRejection = (reason, promise) => {
    logger.error({
        reason,
        error : `Unhandled Rejection at Promise: ${  promise}`
    });
};

export const uncaughtException = (error) => {
    logger.error(`uncaughtException: ${  error.message}`);
    logger.error(error.stack);
    // process.exit(1);
};

export const errorLogger = (err, req, res, next) => {
    logger.error(err);
    next(err);
};

/**
 * If you don't care about primitives and only objects then this function
 * is for you, otherwise look elsewhere.
 * This function will return `false` for any valid json primitive.
 * EG, 'true' -> false
 *     '123' -> false
 *     'null' -> false
 *     '"I'm a string"' -> false
 */
const tryParseJSONObject = (jsonString) => {
    try {
        const o = JSON.parse(jsonString);

        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns null, and typeof null === "object",
        // so we must check for that, too. Thankfully, null is falsey, so this suffices:
        if (o && typeof o === 'object') {
            return o;
        }
    } catch (e) {
        return jsonString;
    }
};

export const errorResponder = (err, req, res, next) => {
    if (err.status_code) {
        return res.status(err.status_code).send(err);
    }

    if (process.env.APP_DEBUG == 'true') {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            'level' : err.level,
            'message' : tryParseJSONObject(err.message),
            'timestamp' : err.timestamp,
            'stacktrace' : err.stack
        });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        'level' : err.level,
        'message' : tryParseJSONObject(err.message)
    });
};
