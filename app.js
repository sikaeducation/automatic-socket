import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import express from 'express';

import { formatCount, addNoise } from './utilities.js';

export const app = express();
app.use(express.static('./client'));
const server = createServer(app);

const wss = new WebSocketServer({ server, path: '/socket-server' });

let count = 12; // Initial seed value
setInterval(() => {
  count += Math.floor(Math.random() * 10) * 1713; // Random number to increment by
}, 2000);

wss.on('connection', (ws) => {
  const singleInterval = setInterval(() => {
    const formattedCount = formatCount(count);
    ws.send(formattedCount);
  }, 2000);
  wss.on('close', () => {
    clearInterval(singleInterval);
  });

  ws.on('message', (buffer) => {
    const message = buffer.toString();
    if (message !== 'all') return;

    clearInterval(singleInterval);
    const multipleInterval = setInterval(() => {
      ws.send(JSON.stringify({
        data: ['A', 'B', 'C', 'D'].map((id) => ({
          id,
          count: addNoise(count),
        })),
      }));
    }, 2000);

    wss.on('close', () => {
      clearInterval(multipleInterval);
    });
  });
});

export default server;
