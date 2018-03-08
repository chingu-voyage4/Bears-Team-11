import { Project } from '../types/Projects.d';
import { User } from '../types/User.d';

function generateRandomDelay(): number {
  return Math.floor(Math.random() * (1000 - 10 + 1)) + 10;
}

/* Mock Objects */
var users: Array<User> = [
  {
    firstName: 'Gorden',
    lastName: 'Ramsay',
    email: 'gramsy@gmail.com',
    password: 'masterchef'
  }
];

var projects: Array<Project> = [
  {
    name: 'Momentum Dash',
    creator: 'lilgangwolf',
    link: 'https://github.com/chingu-coders/Voyage2-Turtles-11',
    image: 'https://goo.gl/hBQdUP',
    teamMembers: ['thorbw', 'eun park', 'miles burke'],
    description: `TurtleTab is a Google Chrome Extension Built with React. It creates a new homepage 
        which features current Weather, Todo and Notes functionality. It also accesses your browser 
        data to see Bookmarks, enable/disable Apps and Extensions, and see/clear your History.`,
    contact: 'lilgangwolf',
    lookingFor: ['Programmer', 'Designer'],
    comments: 'None',
    createdAt: 1519337864764,
    dueDate: 1519337864764,
    views: 100,
    category: 'Productivity Tool',
    status: true,
    upVotes: 10
  }
];

/* User */
function login(email: string, password: string): Promise<User | Error> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.filter(currentUser => {
        return currentUser.email === email && currentUser.password === password;
      })[0];
      user
        ? resolve(user)
        : reject(new Error('Wrong username and/or password.'));
    }, generateRandomDelay());
  });
}

function register(
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<User | Error> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.filter(currentUser => {
        return currentUser.email === email;
      })[0];
      user ? resolve(user) : reject(new Error('Email is already in use.'));
    }, generateRandomDelay());
  });
}

function logout(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, generateRandomDelay());
  });
}

/* Project */
function getProjects(): Promise<Array<Project>> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(projects);
    }, generateRandomDelay());
  });
}

/* Service Module */
var apiService = {
  login,
  register,
  logout,
  getProjects
};

export default apiService;
