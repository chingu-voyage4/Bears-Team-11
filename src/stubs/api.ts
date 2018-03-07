interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface Project {
  name: string;
  creator: string;
  link: string;
  image: string;
  teamMembers: string[];
  description: string;
  contact: string;
  lookingFor: string[];
  comments: string;
  createdAt: number;
  dueDate: number;
  views: number;
  category: string;
  status: boolean;
  upVotes: number;
}

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

export function loginAPI(email: string, password: string): User | boolean {
  const user = users.filter(currentUser => {
    return currentUser.email === email && currentUser.password === password;
  })[0];

  return user ? user : false;
}

export function registerAPI(
  firstName: string,
  lastName: string,
  email: string,
  password: string
): boolean {
  var emails = users.filter(user => {
    return user.email === email;
  });

  return emails.length === 0 ? true : false;
}

export function logoutAPI(): boolean {
  return true;
}

export function getProjectsAPI(): Array<Project> {
  return projects;
}

// mongodb <-> redux
// mongodb <-> transformer <-> redux
