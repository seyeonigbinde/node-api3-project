const User = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`[${req.method}] ${req.url} ${new Date().toISOString()}`)
    
  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  console.log('validateUserId middleware')
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        res.status(404).json({
          error: `user not found`
        })
      
      } else {
        // since we have the hub we append it to req
        req.user = user
        next()
      }
    })
    .catch(err => {
      next(err)
    })
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body
  if (
    !name ||
    typeof name !== 'string' ||
    name.trim().length <= 2
  ) {
    // validation fails
    next({
      message: 'missing required name field',
      status: 400,
    })

  } else {
    req.user = { name: req.body.name.trim() }
    next()
    // validation succeed
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body
  if (
    !text ||
    typeof text !== 'string' ||
    text.trim().length <= 2
  ) {
    // validation fails
    next({
      message: 'missing required text field',
      status: 400,
    })

  } else {
    req.post = { name: req.body.text.trim() }
    next()
    // validation succeed
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validatePost,
  validateUser,
  validateUserId
}