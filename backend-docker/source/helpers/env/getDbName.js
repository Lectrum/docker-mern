import { ValidationError } from '../errors';

export const getDbName = () => {
    const { DB_NAME } = process.env;

    if (!DB_NAME) {
        throw new ValidationError('Environment variable DB_NAME should be specified');
    }

    if (typeof DB_NAME !== 'string') {
        throw new ValidationError('Environment variable DB_NAME should be a string');
    }

    return DB_NAME;
};
