const request = require('supertest');
const app = require('../api/server');

describe('posting new user', function() {
  test('create user', () => {
    request(app)
      .post('/api/signup')
      .send({
        firstName: 'Joe',
        lastName: 'Smol',
        username: 'joesmol',
        password: 'secret',
        email: 'joe@gmail.com'
      })
      .expect(200)
      .then(res => {
        console.log(res.body.message);
        expect(typeof res.body.message).toBe('json');
        expect(res.body.message).toBe({
          firstName: 'Joe',
          lastName: 'Smol',
          username: 'joesmol',
          email: 'joe@gmail.com'
        })
      });
  });
});

// describe('POST/api/v1/user/login', function() {
//   test('login user', () => {
//     request(app)
//       .post('/api/v1/user/login')
//       .send({
//         email: 'blackpanther@wakanda.gov',
//         password: 'shouldbeencrypted'
//       })
//       .set('Content-Type', 'application/json')
//       .set('Accept', 'application/json')
//       .expect(200)
//       .then(res => {
//         expect(res.header['set-cookie']).toBeTruthy;
//       });
//   });

//   test('login user with incorrect password', () => {
//     request(app)
//       .post('/api/v1/user/login')
//       .send({
//         email: 'blackpanther@wakanda.gov',
//         password: 'password'
//       })
//       .set('Content-Type', 'application/json')
//       .set('Accept', 'application/json')
//       .expect(401);
//   });

//   test('login user with incorrect email', () => {
//     request(app)
//       .post('/api/v1/user/login')
//       .send({
//         email: 'BlackAngus@beef.com',
//         password: 'shouldbeencrypted'
//       })
//       .set('Content-Type', 'application/json')
//       .set('Accept', 'application/json')
//       .expect(401);
//   });

//   test('login user with incorrect email and password', () => {
//     request(app)
//       .post('/api/v1/user/login')
//       .send({
//         email: 'BlackAngus@beef.com',
//         password: 'password'
//       })
//       .set('Content-Type', 'application/json')
//       .set('Accept', 'application/json')
//       .expect(401);
//   });
// });

// describe('POST/api/v1/user/logout', function() {
//   test('logout user', () => {
//     request(app)
//       .post('/api/v1/user/logout')
//       .expect(200);
//   });
// });

// describe('GET/api/v1/user/restricted', function() {
//   test('non-authenticated user', () => {
//     request(app)
//       .get('/api/v1/user/restricted')
//       .expect(401);
//   });

//   const agent = request.agent(app);

//   test('authenticated user', () => {
//     agent
//       .post('/api/v1/user/login')
//       .send({
//         email: 'blackpanther@wakanda.gov',
//         password: 'shouldbeencrypted'
//       })
//       .set('Content-Type', 'application/json')
//       .set('Accept', 'application/json');

//     agent.get('/api/v1/user/restricted').expect(200);
//   });
// });
