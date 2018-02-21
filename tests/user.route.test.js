const request = require('supertest');
const server = require('../api/server');

describe('POST/api/v1/user', function() {
  test('respond with message success', () => {
    return request(server)
      .post('/api/v1/user')
      .expect(200)
      .then(res => {
        expect(res.body.message).toBe('success');
        expect(res.body.route).toBe('api/v1/user');
      });
  });
});

describe('POST/api/v1/user/login', function() {
  test('respond with message success', () => {
    return request(server)
      .post('/api/v1/user/login')
      .expect(200)
      .then(res => {
        expect(res.body.message).toBe('success');
        expect(res.body.route).toBe('api/v1/user/login');
      });
  });
});

describe('POST/api/v1/user/logout', function() {
  test('respond with message success', () => {
    return request(server)
      .post('/api/v1/user/logout')
      .expect(200)
      .then(res => {
        expect(res.body.message).toBe('success');
        expect(res.body.route).toBe('api/v1/user/logout');
      });
  });
});
