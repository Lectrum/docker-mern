// Core
import express from 'express';

// Handlers
import * as user from './';

const route = express.Router();

route.post('/signup', user.post);

route.get('/', user.get);

export { route as users };
