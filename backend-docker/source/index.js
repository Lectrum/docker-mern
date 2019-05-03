// Instruments
import { app } from './server';
import { getPort } from './helpers';

const port = getPort();

app.listen(port, () => {
    console.log(`Server API is up on port ${port}`); // eslint-disable-line
});
