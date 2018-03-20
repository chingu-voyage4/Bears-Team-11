const request = require('supertest');
const app = require('../api/server');

// --------------------- 
// NEW USER
// --------------------- 
describe('posting new user', function () {
  test('create user', () => {
    return request(app)
      .post('/api/signup')
      .send({
        firstName: 'John',
        lastName: 'Smith',
        username: 'jsmith',
        password: 'secret',
        email: 'jsmith@gmail.com'
      })
      .expect(200)
      .then(res => {
        expect(res.text).toBe('User Registration Succesful');
      });
  });

  test('duplicate email should reject new user', () => {
    return request(app)
      .post('/api/signup')
      .send({
        firstName: 'Peter',
        lastName: 'Rabbit',
        username: 'prabbit',
        password: 'secret',
        email: 'peter@gmail.com'
      })
      .expect(res => {
        expect(res.text).toBe('User already exists with this email or username');
      });
  });
});


// --------------------- 
// LOGIN & LOGOUT USER   
// --------------------- 
describe('login & logout user', function () {

  test('log in unregistered user', () => {
    return request(app)
      .post('/api/login')
      .send({
        password: 'testingNonUser',
        email: 'testingNonUser@gmail.com'
      })
      .expect(res => {
        expect(res.text).toBe('User Not Found with Email');
      });
  });

  test('log in existing user', () => {
    return request(app)
      .post('/api/login')
      .send({
        password: 'secret',
        email: 'peter@gmail.com'
      })
      .expect(res => {
        expect(res.text).toBe('Login Successful');
      })
  });

  test('logout user', () => {
    return request(app)
      .get('/api/logout')
      .expect(res => {
        expect(res.text).toBe('Successfully Logged Out');
      });
  })

  test('log in user with incorrect password', () => {
    return request(app)
      .post('/api/login')
      .send({
        password: 'wrongpassword',
        email: 'peter@gmail.com'
      })
      .expect(res => {
        expect(res.text).toBe('Invalid Password');
      });
  });
});


