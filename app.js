import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import express from 'express';

export const app = express();
app.use(express.static('./client'));
const server = createServer(app);

const wss = new WebSocketServer({ server, path: '/socket-server' });

let count = 12; // Initial seed value
setInterval(() => {
  count += Math.floor(Math.random() * 10) * 1713; // Random number to increment by
}, 2000);

wss.on('connection', (ws) => {
  setInterval(() => {
    const formattedCount = Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(count);
    ws.send(formattedCount);
  }, 2000);
});

export default server;
