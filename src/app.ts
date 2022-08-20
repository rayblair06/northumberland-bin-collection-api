import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';


import routes from './http/api/routes';
import {
    errorLogger,
    unhandledRejection,
    uncaughtException,
    errorResponder
} from './http/middleware';


dotenv.config();

const app = express();

app.use(helmet());

process
    .on('unhandledRejection', unhandledRejection)
    .on('uncaughtException', uncaughtException);

app.use(cors());
app.use(express.json());

// Router
app.use(routes);

// Error Middleware
app.use(errorLogger);
app.use(errorResponder);


export { app };
