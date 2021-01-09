#!/usr/bin/env node

const app = require('./src/app');
const debug = require('debug')('km:server');
const http = require('http');
const config = require('./config')();

const port = config.port || '8080';
app.set('port', port);
console.log("RUN MODE: " + config.env);

let server = http.createServer(app);
server.listen(port);
console.log('REST server running on port: ', port);
