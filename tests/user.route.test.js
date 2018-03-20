const request = require('supertest');
const app = require('../api/server');

describe('posting new user', function () {
  test('create user', () => {
    return request(app)
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
        expect(res.text).toBe('Success');
      });
  });

  // test('duplicate email should reject new user', () => {
  //   return request(app)
  //     .post('/api/signup')
  //     .send({
  //       firstName: 'Peter',
  //       lastName: 'Rabbit',
  //       username: 'prabbit',
  //       password: 'secret',
  //       email: 'peter@gmail.com'
  //     })
  //     .expect(res => {
  //       expect(res.text).toBe('User already exists');
  //     });
  // });
});

describe('login user', function () {
  test('log in existing user', () => {
    return request(app)
      .post('/api/login')
      .send({
        password: 'secret',
        email: 'peter@gmail.com'
      })
      .expect(res => {
        expect(res.text).toBe('Login Successful');
      });
  });

  // test('log in unregistered user', () => {
  //   return request(app)
  //     .post('/api/login')
  //     .send({
  //       password: 'testingNonUser',
  //       email: 'testingNonUser@gmail.com'
  //     })
  //     .expect(res => {
  //       expect(res.text).toBe('Account not registered');
  //     });
  // });

  test('logout user', () => {
    return request(app)
      .get('api/signout')
      .expect(res => {
        console.log('res is ' + res);
        expect(res.text).toBe('Successfully Logged Out');
      });
  })

  // test('log in user with incorrect password', () => {
  //   return request(app)
  //     .post('/api/login')
  //     .send({
  //       password: 'wrongpassword',
  //       email: 'peter@gmail.com'
  //     })
  //     .expect(res => {
  //       expect(res.text).toBe('Account not registered');
  //     });
  // });
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
