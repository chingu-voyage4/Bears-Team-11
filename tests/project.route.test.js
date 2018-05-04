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
      email: 'fs@gmail.com'
    })
    .then(res => {
      loginCookie = res.header['set-cookie'];
    });
});

afterAll(() => {
  return request(app).get('/api/logout');
});

// ---------------------
// NEW PROJECT
// ---------------------
describe('CRUD project', function() {
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
        lookingFor: ['Programmer'],
        status: true,
        category: 'Productivity',
        tags: ['search'],
        contact: 'person b'
      })
      .expect(res => {
        expect(res.body.message).toEqual('New project saved successfully');
      });
  });
  test('get project', () => {
    return request(app)
      .get('/api/projects/5ae2d77c9b979d4cf8b40c22')
      .expect(res => {
        expect(res.body.project).toMatchObject({
          _id: '5ae2d77c9b979d4cf8b40c22',
          name: 'Anibu'
        });
      });
  });

  test('update project name', () => {
    return request(app)
      .post('/api/projects/update/5ae2d77c9b979d4cf8b40c22')
      .set('Content-Type', 'application/json')
      .set('cookie', loginCookie)
      .send({ name: 'Anibu: Anime Browser' })
      .expect(res => {
        expect(res.body.project).toMatchObject({
          _id: '5ae2d77c9b979d4cf8b40c22',
          name: 'Anibu: Anime Browser'
        });
      });
  });
  test('update project name to Anibu', () => {
    return request(app)
      .post('/api/projects/update/5ae2d77c9b979d4cf8b40c22')
      .set('Content-Type', 'application/json')
      .set('cookie', loginCookie)
      .send({ name: 'Anibu' })
      .expect(res => {
        expect(res.body.project).toMatchObject({
          _id: '5ae2d77c9b979d4cf8b40c22',
          name: 'Anibu'
        });
      });
  });

  var mostRecentProjectId;
  test('get list of projects by created timestamp', () => {
    return request(app)
      .post('/api/projects/')
      .set('Content-Type', 'application/json')
      .set('cookie', loginCookie)
      .send({
        options: {
          sort: { createdAt: -1 }
        },
        query: {}
      })
      .expect(res => {
        mostRecentProjectId = res.body.projects.docs[0]['_id'];
        expect(res.body.projects.docs[0]).toMatchObject({
          name: 'Google'
        });
      });
  });

  test('delete project', () => {
    console.log(mostRecentProjectId);
    return request(app)
      .post('/api/projects/delete')
      .set('Content-Type', 'application/json')
      .set('cookie', loginCookie)
      .send({
        id: mostRecentProjectId
      })
      .expect(res => {
        expect(res.body.message).toEqual('Project successfully deleted');
      });
  });
});
