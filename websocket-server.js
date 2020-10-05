const querystring = require('querystring');
const WebSocket = require('ws');

const context = require('./context');

const registerWebsocketServer = (server) => {
  const wss = new WebSocket.Server({ noServer: true });

  wss.on('connection', (socket, request) => {
    context.challenges.registerSocket(request.challengeSid, socket);
  });

  server.on('upgrade', (request, socket, head) => {
    const query = querystring.parse(request.url.substr(2));

    const { status } = context.challenges.get(query.challengeSid);

    if (status && status === 'pending') {
      request.challengeSid = query.challengeSid;

      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request, socket);
      });
    } else {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
    }
  });
};

module.exports = { registerWebsocketServer };
