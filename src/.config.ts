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
    name: 'https://www.projectmatch.me'
  },
  client: {
    name: 'https://www.projectmatch.me'
  },
  env: 'production'
};

const config = process.env.NODE_ENV === 'production' ? production : development;

export default {
  ...config
};
