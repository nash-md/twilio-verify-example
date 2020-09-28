const helper = require('../session-helper');

const validateSessionWithMultifactor = (request, response, next) => {
  if (!helper.hasValidSession(request)) {
    return response.redirect('/');
  }

  if (helper.hasValidSession(request) && helper.hasPendingPushVerification(request)) {
    return response.redirect('/push-challenge-pending');
  }

  next();
};

module.exports = validateSessionWithMultifactor;
