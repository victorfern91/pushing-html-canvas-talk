const express = require("express");
const serveIndex = require("serve-index");
const server = express();

server.use('/common', express.static(`${__dirname}/common`), serveIndex(`${__dirname}/common`, {'icons': true}))
server.use('/', express.static(`${__dirname}/examples`), serveIndex(`${__dirname}/examples`, {'icons': true}))

server.listen(3000);
