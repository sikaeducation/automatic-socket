import WebSocket from 'ws';
import {
  beforeAll, afterAll, expect, test,
} from '@jest/globals';
import server from './app';

const port = process.env.PORT || 9999;

beforeAll(() => {
  server.listen(port);
});
afterAll(async () => {
  server.closeAllConnections();
  server.close();
});

test('Sockets work', (done) => {
  const client = new WebSocket(`ws://localhost:${port}/`);
  client.on('message', (buffer) => {
    const message = buffer.toString();
    expect(message).toEqual(expect.stringMatching(/\w+/));
    client.close();
    done();
  });
});
