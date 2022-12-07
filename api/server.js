const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const http = require('http');
const { createSocket } = require('./socket');

const port = 3001;

const createApp = () => {
    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());

    app.use('/', require('./routes'))    

    return app;
}

const app = createApp();
const server = http.createServer(app);
createSocket(server);

server.listen(port, () => {
    console.log(`Server listening on *:${port}`);
});