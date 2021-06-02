const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const {
  validateUserId,
  validateUser,
  validatePost
} = require('../middleware/middleware');

const User = require('./users-model');
const Post = require('../posts/posts-model');

const router = express.Router();

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get(req.query)
  .then(users => {
    res.status(200).json(users);
  })
  .catch(next)
});

// router.get('/:id', validateUserId, getByIdRouter)
router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  User.insert(req.user)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(next);
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  User.update(req.params.id, req.body)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(error => {
    next(error)
  });
});

router.delete('/:id', validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  User.remove(req.params.id)
  .then(() => {
    res.status(200).json({ message: 'The user has been nuked' });
  })
  .catch(next);
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  User.getUserPosts(req.params.id)
  .then(post => {
    res.status(200).json(post);
  })
  .catch(next);
});

router.post('/:id/posts', validateUserId,  validatePost, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const postInfo = { ...req.body, id: req.params.id };

  Post.insert(postInfo)
    .then(post => {
      res.status(210).json(post);
    })
    .catch(error => {
      next(error)
    });
});

// do not forget to export the router
module.exports = router;