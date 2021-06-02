const express = require('express');
const userRouter = require('./users/users-router');

const server = express();

const { logger} = require('./middleware/middleware');

// remember express by default cannot parse JSON in request bodies
server.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path}`)
  next()
})

server.use(express.json());


// global middlewares and the user's router need to be connected here
server.use(logger);
server.use('/api/users', userRouter);

server.use((err, req, res, next) => { // eslint-disable-line
  console.log('err handling midd kicking in!', err.message)
  res.status(err.status || 500).json({
    custom: 'something exploded inside the app',
    message: err.message,
    stack: err.stack,
  })
});

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;


