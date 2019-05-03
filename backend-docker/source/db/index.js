// Core
import mongoose from 'mongoose';

// Instruments
import { getDbName, getDbUrl } from '../helpers';

const DB_NAME = getDbName();
const DB_URL = getDbUrl();

const mongooseOptions = {
    promiseLibrary:    global.Promise,
    poolSize:          10,
    keepAlive:         30000,
    connectTimeoutMS:  5000,
    reconnectTries:    Number.MAX_SAFE_INTEGER,
    reconnectInterval: 5000,
    useNewUrlParser:   true,
    useFindAndModify:  false,
    useCreateIndex:    true,
};

// mongodb://username:password@localhost:27017/users
const connection = mongoose.connect(`mongodb://${DB_URL}:27017/${DB_NAME}`, mongooseOptions);

connection
    .then(() => {
        // eslint-disable-next-line
        console.log(`DB '${DB_NAME}' connected`);
    })
    .catch(({ message }) => {
        // eslint-disable-next-line
        console.log(`DB ${DB_NAME} connectionError: ${message}`);
    });
