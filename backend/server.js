const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8000 });


wss.on('connection', (ws, req) => {

  ws.on('message', (message) => {
    const msg = JSON.parse(message);
    switch (msg.type) {
      case 'connect':
        break;
    };
  });

});
