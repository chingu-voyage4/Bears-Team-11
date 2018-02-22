const request = require('supertest');
const app = require('../api/server');

describe('POST/api/v1/user', function() {
  test('create user', () => {
    request(app)
      .post('/api/v1/user')
      .send({
        username: 'joe',
        password: 'secret',
        name: 'Joe Smol',
        email: 'joe@gmail.com'
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .then(res => {
        expect(res.header['set-cookie']).toBeTruthy;
      });
  });
});

describe('POST/api/v1/user/login', function() {
  test('login user', () => {
    request(app)
      .post('/api/v1/user/login')
      .send({
        username: 'BlackPanther',
        password: 'shouldbeencrypted'
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .then(res => {
        expect(res.header['set-cookie']).toBeTruthy;
      });
  });

  test('login user with incorrect password', () => {
    request(app)
      .post('/api/v1/user/login')
      .send({
        username: 'BlackPanther',
        password: 'password'
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(401);
  });

  test('login user with incorrect username', () => {
    request(app)
      .post('/api/v1/user/login')
      .send({
        username: 'BlackAngus',
        password: 'shouldbeencrypted'
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(401);
  });

  test('login user with incorrect username and password', () => {
    request(app)
      .post('/api/v1/user/login')
      .send({
        username: 'BlackAngus',
        password: 'password'
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(401);
  });
});

describe('POST/api/v1/user/logout', function() {
  test('logout user', () => {
    request(app)
      .post('/api/v1/user/logout')
      .expect(200);
  });
});

describe('GET/api/v1/user/restricted', function() {
  test('non-authenticated user', () => {
    request(app)
      .get('/api/v1/user/restricted')
      .expect(401);
  });

  const agent = request.agent(app);

  test('authenticated user', () => {
    agent
      .post('/api/v1/user/login')
      .send({
        username: 'BlackPanther',
        password: 'shouldbeencrypted'
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    agent.get('/api/v1/user/restricted').expect(200);
  });
});
