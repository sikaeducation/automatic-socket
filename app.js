import { WebSocketServer } from 'ws';
import { createServer } from 'http';

const server = createServer();
const wss = new WebSocketServer({ server });
wss.on('connection', (ws) => {
  ws.send("Here's a message");
});

export default server;
