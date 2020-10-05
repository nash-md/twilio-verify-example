const fs = require('fs');
const mustache = require('mustache');

const helper = require('../session-helper');

module.exports.register = (request, response) => {
  let page = fs.readFileSync('pages/register.html', 'utf8');
  let render = mustache.render(page, {});

  response.status(200).send(render);
};

module.exports.login = (request, response) => {
  let page = fs.readFileSync('pages/login.html', 'utf8');
  let render = mustache.render(page, {});

  response.status(200).send(render);
};

module.exports.profile = (request, response) => {
  let page = fs.readFileSync('pages/profile.html', 'utf8');

  const { user } = request.session;

  const view = {
    name: user.name,
    pushIsDisabled: !helper.hasPushVerificationEnabled(user) ? true : false,
    pushIsEnabled: helper.hasPushVerificationEnabled(user) ? true : false,
    expiresIn: Math.round(request.session.cookie.maxAge / 1000 / 60)
  };

  let render = mustache.render(page, view);

  response.status(200).send(render);
};

module.exports.pending = (request, response) => {
  let page = fs.readFileSync('pages/push-challenge-pending.html', 'utf8');

  const view = {
    name: request.session.user.name
  };

  view.challengeSid = request.session.challenge.sid || '';

  let render = mustache.render(page, view);

  response.status(200).send(render);
};

module.exports.reject = (request, response) => {
  let page = fs.readFileSync('pages/push-challenge-rejected.html', 'utf8');

  const view = {};

  let render = mustache.render(page, view);

  response.status(200).send(render);
};

module.exports.logout = (request, response) => {
  request.session.destroy((error) => {
    response.redirect('/');
  });
};
