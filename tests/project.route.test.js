const request = require('supertest');
const app = require('../api/server');

// --------------------- 
// SETUP
// --------------------- 
beforeAll(() => {
  return request(app)
    .post('/api/login')
    .send({
      password: 'secret',
      email: 'peter@gmail.com'
    })
});

afterAll(() => {
  return request(app).get('/api/logout')
});

// --------------------- 
// NEW PROJECT
// --------------------- 
describe('post new project', function () {
  test('create new project', () => {
    return request(app)
      .post('/api/projects/add')
      .send({
        name: 'Google',
        description: 'Search for all websites on the internet',
        dueDate: '04/01/18',
        team: ['person a', 'person b'],
        githubLink: 'www.gooogle.com',
        mockupLink: 'www.google.com',
        liveLink: 'www.google.com',
        lookingFor: 'programmer',
        status: 'completed',
        category: 'Productivity Tool',
        tags: 'search',
        images: '',
        contact: 'person b',
        creator: 'person a'
      })
      .then(res => {
        expect(res.text.message).toBe('New project saved successfully')
      })
  })
})