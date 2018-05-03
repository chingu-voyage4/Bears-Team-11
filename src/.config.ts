const development = {
  host: {
    name: 'http://localhost:8080'
  },
  client: {
    name: 'http://localhost:3000'
  },
  env: 'developement'
};

const production = {
  host: {
    name: 'http://projectmatch.me'
  },
  client: {
    name: 'http://projectmatch.me'
  },
  env: 'production'
};

const config = process.env.NODE_ENV === 'production' ? production : development;

export default {
  ...config
};
