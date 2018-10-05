const createError = require('http-errors');

module.exports.isAuthenticated = (req, res, next) => {
    if(!req.isAuthenticated()) {
        throw createError(403);
    } else {
        next();
    }
}

module.exports.checkRole = (role) => {
    return (req, res, next) => {
      if(req.user.role === role) {
        next();
      } else {
        next (createError(403), 'You are not allowed to see this. It is top secret')
      }
    }
  }

module.exports.isMe = (param = 'id') => {
    return (req, res, next) => {
      const user_id = req.params[param];
      if (!req.isAuthenticated()) {
        throw createError(403);
      } else if (user_id !== req.user.id) {
        throw createError(401);
      } else {
        next();
      }
    }
  }