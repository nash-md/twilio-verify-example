const parser = require('ua-parser-js');

const helper = require('../session-helper');
const context = require('../context');

const login = async (request, response) => {
  const { name, password } = request.body;

  const user = await context.repository.findUserByNameAndPassword(name, password);

  if (!user) return response.status(403).end();

  request.session.user = user;
  request.session.cookie.expires = new Date(Date.now() + 10 * 60 * 1000);

  const payload = { id: user.id, redirect: '/profile' };

  response.json(payload);
};

module.exports = login;
