const sessionSecret = 'super secret'; // make sure to change in produciton
const db = 'Some Db String';
module.exports = {
  sessionSecret,
  db: {
    local: 'mongodb://localhost/team',
    mlab: 'mongodb://bt11:b11@ds019480.mlab.com:19480/pmatch'
  },
  host: {
    name: 'http://localhost:3000'
  },
  server: {
    name: 'http://localhost:8080'
  }
};
