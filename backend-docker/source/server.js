// Core
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

// Routes
import * as domains from './domains';

// Instruments
import { requireJsonContent, NotFoundError } from './helpers';

// Initialize DB connection
import './db';

const app = express();

app.use(helmet());
app.use(cors());
app.use(
    express.json({
        limit: '10kb',
    }),
);
app.use(requireJsonContent);
app.use((req, res, next) => {
    // eslint-disable-next-line
    console.log(`${req.method}: ${req.originalUrl}`);
    next();
});

app.use('/api/users', domains.users);

app.get('/api/ping', (req, res) => {
    res.sendStatus(204);
});

app.use('*', (req, res, next) => {
    const error = new NotFoundError(
        `Can not find right route for method ${req.method} and path ${req.originalUrl}`,
        404,
    );
    next(error);
});

if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-unused-vars
    app.use((error, req, res, next) => {
        const { message, statusCode } = error;

        const status = statusCode ? statusCode : 500;
        res.status(status).json({ message: message });
    });
}

export { app };
