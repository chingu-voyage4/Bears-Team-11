const request = require('supertest');
const app = require('../api/server');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

process.env.NODE_ENV = 'test';
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
  test('create new project', () => {
    return request(app)
      .post('/api/projects/add')
      .set('Content-Type', 'application/json')
      .set('cookie', loginCookie)
      .send({
        name: 'Google',
        description: 'Search for all websites on the internet',
        dueDate: '04/01/18',
        team: ['person a', 'person b'],
        githubLink: 'www.gooogle.com',
        mockupLink: 'www.google.com',
        liveLink: 'www.google.com',
        lookingFor: ['programmer'],
        status: true,
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
      .get('/api/projects/5ac57429d5ddfb8d0c425952')
      .expect(res => {
        expect(res.body).toMatchObject({
          _id: '5ac57429d5ddfb8d0c425952',
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
        id: '5ac57429d5ddfb8d0c425952',
        updateKey: 'name',
        updateObject: 'Momentum Dash Chingu Clone'
      })
      .expect(res => {
        expect(res.body.project).toMatchObject(
          {
            _id: '5ac57429d5ddfb8d0c425952',
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
        id: '5ac57429d5ddfb8d0c425952',
        updateKey: 'name',
        updateObject: 'Google Labs'
      })
      .expect(res => {
        expect(res.body.project).toMatchObject(
          {
            _id: '5ac57429d5ddfb8d0c425952',
            name: 'Google Labs'
          }
        );
      })
  })
  var mostRecentProjectId;
  test('get list of projects by created timestamp', () => {
    return request(app)
      .post('/api/projects/filter')
      .set('Content-Type', 'application/json')
      .set('cookie', loginCookie)
      .send({
        options: {
          sort: {createdAt: -1}
        }
      })
      .expect(res => {
        // res.body.docs[0]
        mostRecentProjectId = res.body.docs[0]["_id"];
        expect(res.body.docs[0]).toMatchObject(
          {
            name: 'Google'
          }

        );
      })
  })

  test('delete project', () => {
    console.log(mostRecentProjectId)
    return request(app)
      .post('/api/projects/delete/one')
      .set('Content-Type', 'application/json')
      .set('cookie', loginCookie)
      .send({
        id: mostRecentProjectId
      })
      .expect(res => {
        expect(res.body.message).toEqual('Project successfully deleted');
      })
  })
})