// const request = require('supertest');
// const app = require('../api/server');

// let loginCookie;

// function testSetup() {
//   beforeAll(() => {
//     return request(app)
//       .post('/api/login')
//       .set('Content-Type', 'application/json')
//       .send({
//         password: 'secret',
//         email: 'peter@gmail.com'
//       })
//       .then( res => {
//         loginCookie = res.header['set-cookie'];
//       })
//   });

//   afterAll(() => {
//     return request(app).get('/api/logout')
//   });
// }

// module.exports = {testSetup, loginCookie};
