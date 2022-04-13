const User = require('../users/users-model');

function logger(req, res, next) {
  // logs to the console:
    // request method, request url, timestamp
  const time = new Date().toLocaleDateString();
  const requestMethod = req.method;
  const url = req.originalUrl;
  console.log(`[${time}] ${requestMethod} to ${url}`);
  // then passes to next
  next();
}

async function validateUserId(req, res, next) {
  // used for endpoints with :id, to see if user exists
  // if id valid, store user as req.user and allow request continue
  // if id no match, 404 "user not found" 
  try {
    const user = await User.getById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "user not found" });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    console.log(err.message);
  }
}

function validateUser(req, res, next) {
  // validates body on a request to create or update a user
  // if body lacks name field, respond with 400 "missing required name field"
  const {name} = req.body;
  if (!name) {
    res.status(400).json({ message: "missing required name field"});
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // validate body on reqs to create posts
  // if no text, respond 400 "missing required text field"
  const {text} = req.body;
  if (!text) {
    res.status(400).json({ message: "missing required text field"});
  } else {
    next();
  }
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUser,
  validateUserId,
  validatePost
}