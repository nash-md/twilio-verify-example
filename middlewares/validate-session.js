const helper = require('../session-helper');

const validateSession = (request, response, next) => {
  if (!helper.hasValidSession(request)) {
    return response.redirect('/');
  }

  next();
};

module.exports = validateSession;
