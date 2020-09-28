const context = require('../context');

const register = async (request, response) => {
  const { user } = request.session;

  await context.repository.addPushVerification(user.id, {
    type: 'push',
    sid: request.body.sid
  });

  response.json({ done: true });
};

const token = async (request, response) => {
  const token = await context.devices.token(request.session.user);

  response.json(token);
};

module.exports = { register, token };
