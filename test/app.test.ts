import request from 'supertest';

import app from '../src/app';

describe('app', () => {
  it('responds with a not found message', (done) => {
    request(app)
      .get('/some-invalid-route')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});

describe('GET /', () => {
  it('responds with a json with message prop', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'Welcome to Gateways_API',
      }, done);
  });
});
