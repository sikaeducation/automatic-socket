import WebSocket from 'ws';
import {
  beforeAll, afterAll, expect, test,
} from '@jest/globals';
import request from 'supertest';
import server, { app } from './app';

const port = process.env.PORT || 9999;

beforeAll(() => {
  server.listen(port);
});
afterAll(async () => {
  server.closeAllConnections();
  server.close();
});

test('Sockets work', (done) => {
  const client = new WebSocket(`ws://localhost:${port}/socket-server`);
  client.on('message', (buffer) => {
    const message = buffer.toString();
    expect(message).toEqual(expect.stringMatching(/\w+/));
    client.close();
    done();
  });
});

test('Web server works', (done) => {
  request(app)
    .get('/')
    .expect(200)
    .expect((response) => {
      expect(response.text).toContain('<html>');
    })
    .end(done);
});
