import WebSocket from 'ws';
import {
  beforeEach, afterEach, expect, test,
} from '@jest/globals';
import request from 'supertest';
import server, { app } from './app';

const port = process.env.PORT || 9999;

beforeEach(() => {
  server.listen(port);
});
afterEach(() => {
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

test('All works', (done) => {
  const client = new WebSocket(`ws://localhost:${port}/socket-server`);

  client.on('open', () => {
    client.send('all');
  });

  client.on('message', (buffer) => {
    const message = buffer.toString();
    const counts = JSON.parse(message);
    expect(counts).toMatchObject({
      data: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          count: expect.any(String),
        }),
      ]),
    });
    client.close();
    done();
  });
});

test('Web server works', (done) => {
  request(app)
    .get('/')
    .expect(200)
    .expect((response) => {
      expect(response.text).toContain('<!doctype html>');
    })
    .end(done);
});
