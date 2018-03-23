const request = require('supertest');  // https://github.com/visionmedia/supertest
const app = require('../api/server');

// --------------------- 
// NEW USER
// --------------------- 
describe('posting new user', function () {
  test('create user', () => {
    return request(app)
      .post('/api/signup')
      .set('Content-Type', 'application/json')
      .send({
        firstName: 'Lemony',
        lastName: 'Snicket',
        username: 'lsnicket',
        password: 'secret',
        email: 'lsnicket@gmail.com'
      })
      .expect(res => {
        expect(res.text).toBe('User Registration Succesful');
      });
  });

  test('delete user', () => {
    return request(app)
      .post('/api/user/delete')
      .set('Content-Type', 'application/json')
      .send({
        username: 'lsnicket',
        password: 'secret'
      })
      .expect(res => {
        expect(res.text).toBe('Successfully deleted user');
      });
  });

  test('duplicate email should reject new user', () => {
    return request(app)
      .post('/api/signup')
      .set('Content-Type', 'application/json')
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
// DEACTIVATE & REACTIVATE USER
// --------------------- 
describe('deactivate & activate user', function () {
  beforeAll(() => {
    return request(app)
      .post('/api/login')
      .set('Content-Type', 'application/json')
      .send({
        password: 'secret',
        email: 'peter@gmail.com'
      })
  });

  afterAll(() => {
    return request(app).get('/api/logout')
  });

  test('deactivate user', () => {
    return request(app)
      .post('/api/user/deactivate')
      .set('Content-Type', 'application/json')
      .send({
        username: 'prabbit',
        password: 'secret'
      })
      .expect(res => {
        expect(res.body.message).toEqual('Successfully deactivated user');
      });
  });

  test('re-activate user', () => {
    return request(app)
      .post('/api/user/activate')
      .set('Content-Type', 'application/json')
      .send({
        username: 'prabbit',
        password: 'secret'
      })
      .expect(res => {
        expect(res.body.message).toEqual('Successfully re-activated user');
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
      .set('Content-Type', 'application/json')
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
      .set('Content-Type', 'application/json')
      .send({
        password: 'secret',
        email: 'peter@gmail.com'
      })
      .expect(res => {
        expect(res.text).toBe('Successfully logged in');
      })
  });

  test('logout user', () => {
    return request(app)
      .get('/api/logout')
      .set('Content-Type', 'application/json')
      .expect(res => {
        expect(res.text).toBe('Successfully Logged Out');
      });
  })

  test('log in user with incorrect password', () => {
    return request(app)
      .post('/api/login')
      .set('Content-Type', 'application/json')
      .send({
        password: 'wrongpassword',
        email: 'peter@gmail.com'
      })
      .expect(res => {
        expect(res.text).toBe('Invalid Password');
      });
  });
});

// --------------------- 
// HOME PAGE  
// --------------------- 
describe('get home page', function () {
  beforeAll(() => {
    return request(app)
      .post('/api/login')
      .set('Content-Type', 'application/json')
      .send({
        password: 'secret',
        email: 'peter@gmail.com'
      })
  });

  afterAll(() => {
    return request(app).get('/api/logout')
  });

  test('get home page', () => {
    return request(app)
      .get('/api/home')
      .expect(res => {
        expect(res.body.message).toBe('Welcome to the Home');
      });
  });
});


