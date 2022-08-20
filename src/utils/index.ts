import { Request, Response, NextFunction } from 'express';

import { ValidationError } from '../exceptions';


const mapSchemaErrors = (schemaErrors) => {
    return schemaErrors.map(({ context, message }) => {
        return {
            attribute: context.key,
            message: message.replace('"', '').replace('\"', '')
        };
    });
};

export const validateSchema = (schema) => {
    return (request: Request, response: Response, next: NextFunction) => {
        const { error } = schema.validate({
            ...request.body,
            ...request.params,
            ...request.query
        }, {
            abortEarly: false,
            allowUnknown: false
        });

        if (error && error.isJoi) {
            throw new ValidationError(mapSchemaErrors(error.details));
        }

        next();
    };
};
