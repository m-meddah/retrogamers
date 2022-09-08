const checkUser = (req, res, next) => {
    if(req.session.user) {
        return next()
    }
    return res.status(401).json({
        error: 'You need to be logged to access collections'
    })
  };

  const userMiddleware = (req, res, next) => {
    if (req.session.user) {
      res.locals.user = req.session.user;
    } else {
      res.locals.user = false;
    }
    next();
  };

  module.exports = {
    checkUser,
    userMiddleware
  }