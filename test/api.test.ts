import request from 'supertest';

import app from '../src/app';

describe('GET /api/v1', () => {
  it('responds with a json message on root path', (done) => {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'API - API root PATH',
      }, done);
  });
});

describe('GET /api/v1/numbers', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1/numbers')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, ['1', '2', '3'], done);
  });
});
