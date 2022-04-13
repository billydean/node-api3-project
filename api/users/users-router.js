const express = require('express');
// You will need `users-model.js` and `posts-model.js` both
const Post = require('../posts/posts-model')
const User = require('../users/users-model')
// The middleware functions also need to be required
const {
  logger,
  validatePost,
  validateUser,
  validateUserId
} = require('../middleware/middleware')

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get()
    .then(users => {
      res.json(users);
    })
    .catch(err => {console.error(err)})
});

router.get('/:id', validateUserId, (req, res) =>  {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  User.getById(req.params.id)
    .then(user=>{
      res.json(user);
    })
    .catch(err=>{
      console.error(err);
    })
});

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  User.insert(req.body)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(err=>{console.error(err)})
});

router.put('/:id', (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;
