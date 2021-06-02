const express = require('express');
const userRouter = require('./users/users-router')

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path}`)
  next()
})

server.use(express.json());

server.use('/api/hubs', userRouter);
// global middlewares and the user's router need to be connected here

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;


