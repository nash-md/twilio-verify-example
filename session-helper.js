const context = require('./context');

const helper = {
  hasPendingPushVerification: (request) => {
    if (!request.session.challenge) {
      return false;
    }

    const status = context.challenges.get(request.session.challenge.sid);

    return status !== 'approved';
  },

  hasValidSession: (request) => {
    return request.session.user;
  },

  hasPushVerificationEnabled: (user) => {
    return user.factor && user.factor.type === 'push';
  }
};

module.exports = helper;
