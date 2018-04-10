const request = require('supertest');  // https://github.com/visionmedia/supertest
const app = require('../api/server');

process.env.NODE_ENV = 'test';
// --------------------- 
// NEW USER
// --------------------- 
let lemonysnicketloginCookie;
let loginCookie;


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
        console.log('res.header = ' + res + ' = ' + res.header['set-cookie']);
        lemonysnicketloginCookie = res.header['set-cookie'];
        expect(res.body.message).toBe('User Registration Succesful');
      });
  });

  test('log in new user', () => {
    return request(app)
      .post('/api/login')
      .set('Content-Type', 'application/json')
      .send({
        password: 'secret',
        email: 'lsnicket@gmail.com'
      })
      .expect(res => {
        expect(res.body.message).toBe('Successfully logged in');
      });
  });

  test('delete user', () => {
    console.log('lemonysnicketloginCookie ' + lemonysnicketloginCookie);
    return request(app)
      .post('/api/user/delete')
      .set('Content-Type', 'application/json')
      .send({
        username: 'lsnicket',
        password: 'secret'
      })
      .expect(res => {
        expect(res.body.message).toBe('Successfully deleted user');
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
        expect(res.body.message).toBe('User already exists with this email or username');
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
      .then(res => {
        loginCookie = res.header['set-cookie'];
      })
  });

  afterAll(() => {
    return request(app).get('/api/logout')
  });

  test('deactivate user', () => {
    return request(app)
      .post('/api/user/deactivate')
      .set('Content-Type', 'application/json')
      .set('cookie', loginCookie)
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
      .set('cookie', loginCookie)
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
        expect(res.body.message).toBe('User Not Found with Email');
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
        expect(res.body.message).toBe('Successfully logged in');
      })
  });

  test('logout user', () => {
    return request(app)
      .get('/api/logout')
      .set('Content-Type', 'application/json')
      .expect(res => {
        expect(res.body.message).toBe('Successfully Logged Out');
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
        expect(res.body.message).toBe('Invalid Password');
      });
  });
});


