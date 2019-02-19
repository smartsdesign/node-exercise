const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

const app = express();

// use body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// let's resolve the Promise immediately for the first
// hit to the API
let promiseTimeout = Promise.resolve();

async function requestTimeout(req, res, next) {
    await promiseTimeout;
    console.log(new Date().getTime());

    // let's reset the Promise and delay the resolve
    // for a chosen duration and then call next
    promiseTimeout = new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 10000);
    });
    next();
}

// we set the requestTimer middleware before out routes.
app.use(requestTimeout);
app.use('/', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
