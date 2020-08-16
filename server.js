const express = require('express');
const server = express();
const lakersRouter = require('./lakers/lakersRouter');

server.use(express.json());
server.use('/api/players', lakersRouter);

server.get('/', (req, res) => {
    res.status(200).json({api: 'up'})
});

module.exports = server;