const request = require('supertest');
const app = require('../api/server');

// --------------------- 
// SETUP
// --------------------- 
// beforeAll(() => {
//   return request(app)
//     .post('/api/login')
//     .set('Content-Type', 'application/json')
//     .send({
//       password: 'secret',
//       email: 'peter@gmail.com'
//     })
// });

// afterAll(() => {
//   return request(app).get('/api/logout')
// });

// --------------------- 
// NEW PROJECT
// --------------------- 
describe('CRUD project', function () {

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

  test('create new project', () => {
    return request(app)
      .post('/api/projects/add')
      .set('Content-Type', 'application/json')
      .send({
        _id: '5dsabdsa9dsakdas',
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
  test('update project', () => {
    return request(app)
      .post('/api/projects/update')
      .set('Content-Type', 'application/json')
      .send({
        id: '5ab2ec07d2b3a87a59c00e5c',
        updateKey: 'name',
        updateObject: 'Momentum Dash Clone'
      })
      .expect(res => {
        expect(res.body).toEqual({
          name: 'Momentum Dash Clone',
          description: 'Google Chrome Extension of a new tab app',
          team: ['lilgangwolf'],
          githubLink: 'www.gooogle.com',
          mockupLink: 'www.google.com',
          liveLink: 'www.google.com',
          lookingFor: ['programmer'],
          status: 'completed',
          category: 'productivity',
          tags: ['chrome extension'],
          images: [''],
          contact: 'lilgangwolf',
          creator: 'lilgangwolf',
          modifiedAt: new Date,
          createdAt: '2018-03-21 16:34:31.621'
        });
      })
  })
  test('delete project', () => {
    return request(app)
      .post('/api/projects/delete/one')
      .set('Content-Type', 'application/json')
      .send({
        id: '5dsabdsa9dsakdas'
      })
      .expect(res => {
        expect(res.body.message).toEqual('Project successfully deleted');
      })
  })
})