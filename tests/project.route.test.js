const request = require('supertest');
const app = require('../api/server');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
// --------------------- 
// SETUP
// --------------------- 
let loginCookie;

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

// --------------------- 
// NEW PROJECT
// --------------------- 
describe('CRUD project', function () {
  var newId = new ObjectID();
  console.log(newId);
  test('create new project', () => {
    return request(app)
      .post('/api/projects/add')
      .set('Content-Type', 'application/json')
      .set('cookie', loginCookie)
      .send({
        _id: newId,
        name: 'Google',
        description: 'Search for all websites on the internet',
        dueDate: '04/01/18',
        team: ['person a', 'person b'],
        githubLink: 'www.gooogle.com',
        mockupLink: 'www.google.com',
        liveLink: 'www.google.com',
        lookingFor: ['programmer'],
        status: 'completed',
        category: 'Productivity Tool',
        tags: ['search'],
        images: [''],
        contact: 'person b',
        creator: 'person a'
      })
      .expect(res => {
        expect(res.body.message).toEqual('New project saved successfully');
      })
  })
  test('get project', () => {
    return request(app)
      .get('/api/projects/5ab2ec07d2b3a87a59c00e5c')
      .expect(res => {
        expect(res.body).toMatchObject({
          _id: '5ab2ec07d2b3a87a59c00e5c',
          name: 'Google Labs'
        });
      })
  })

  test('update project name to Momentum Dash Clone', () => {
    return request(app)
      .post('/api/projects/update')
      .set('Content-Type', 'application/json')
      .set('cookie', loginCookie)
      .send({
        id: '5ab47860b2c84b65d5c4b017',
        updateKey: 'name',
        updateObject: 'Momentum Dash Chingu Clone'
      })
      .expect(res => {
        expect(res.body).toMatchObject(
          {
            _id: '5ab47860b2c84b65d5c4b017',
            name: 'Momentum Dash Chingu Clone'
          }
        );
      })
  })
  test('update project name to Google', () => {
    return request(app)
      .post('/api/projects/update')
      .set('Content-Type', 'application/json')
      .set('cookie', loginCookie)
      .send({
        id: '5ab47860b2c84b65d5c4b017',
        updateKey: 'name',
        updateObject: 'Google Labs'
      })
      .set('cookie', loginCookie)
      .expect(res => {
        expect(res.body).toMatchObject(
          {
            _id: '5ab47860b2c84b65d5c4b017',
            name: 'Google Labs'
          }
        );
      })
  })
  // the delete project test fails because I cannot grab replicate the _id created in the first unit test (new)
  test('delete project', () => {
    return request(app)
      .post('/api/projects/delete/one')
      .set('Content-Type', 'application/json')
      .set('cookie', loginCookie)
      .send({
        id: newId.str
      })
      .expect(res => {
        expect(res).toEqual('Project successfully deleted');
      })
  })
})