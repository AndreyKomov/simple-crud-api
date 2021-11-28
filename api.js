require('dotenv').config();
// const http = require("http");
const port = process.env.PORT || 3000;
import { Router } from './src/router';
import { Server } from './src/server';
const parseJson = require('./src/utils/parseJson');
const addUrl = require('./src/utils/addUrl');
const checkUrl = require('./src/utils/checkUrl');

const server = new Server();
server.callSupport(parseJson);
server.callSupport(addUrl(`http://localhost:${port}/`));
server.callSupport(checkUrl);
server.addRouter(Router);
server.listen(port, () => {
    console.log(`The server has been successfuly started on PORT: ${port}`);
});
