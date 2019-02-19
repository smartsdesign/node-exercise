const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// let's resolve the Promise immediately for the first
// hit to the API, so there is no delay
let promiseTimeout = Promise.resolve();

async function requestTimeout(req, res, next) {
    await promiseTimeout;

    // let's reset the Promise and delay the resolve
    // for a chosen duration and then call next
    promiseTimeout = new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 10000);
    });
    next();
}

// we use the requestTimer middleware before our routes kick in.
app.use(requestTimeout);
app.use('/', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
