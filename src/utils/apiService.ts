import { Project } from '../types/Projects.d';
import { User } from '../types/User.d';

function generateRandomDelay(): number {
  return Math.floor(Math.random() * (1000 - 10 + 1)) + 10;
}

/* Mock Objects */
// var users: Array<User> = [
//   {
//     firstName: 'Gorden',
//     lastName: 'Ramsay',
//     email: 'gramsy@gmail.com',
//     password: 'ilovetoocook'
//   }
// ];

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

var headers: {
  'content-type': 'application/json';
};

/* User */
function login(email: string, password: string): Promise<User | Error> {
  return new Promise((resolve, reject) => {
    const endpoint = 'http://localhost:8080/api/login';

    var data: object = {
      body: {
        email: email,
        password: password
      },
      headers: headers,
      method: 'POST'
    };

    fetch(endpoint, data)
      // tslint:disable-next-line
      .then(function(res: any) {
        if (res.body.message === 'Successfully logged in') {
          var user = res.body.user;
          var userDetails = res.body.userDetails;
          resolve({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            location: userDetails.location,
            roles: userDetails.roles,
            description: userDetails.description,
            techstack: userDetails.techstack,
            projects: userDetails.projects,
            bookmarked: userDetails.bookmarked,
            linkedInLink: userDetails.linkedInLink,
            githubLink: userDetails.githubLink,
            portfolioLink: userDetails.portfolioLink,
            websiteLink: userDetails.websiteLink,
            twitterLink: userDetails.twitterLink,
            blogLink: userDetails.blogLink
          });
        } else {
          reject(res.text);
        }
      });
  });
}

function register(
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<User | Error> {
  return new Promise((resolve, reject) => {
    const endpoint = 'http://localhost:8080/api/signup';

    var data: object = {
      body: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      },
      headers: headers,
      method: 'POST'
    };

    fetch(endpoint, data)
      // tslint:disable-next-line
      .then(function(res: any) {
        if (res.body.message === 'User Registration Succesful') {
          var user = res.body.user;
          resolve({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          });
        } else {
          reject(res.text);
        }
      });
  });
}

function deactivate(
  username: string,
  password: string
): Promise<string | Error> {
  return new Promise((resolve, reject) => {
    const endpoint = 'http://localhost:8080/api/user/deactivate';

    var data: object = {
      body: {
        username: username,
        password: password
      },
      headers: headers,
      method: 'POST'
    };

    fetch(endpoint, data)
      // tslint:disable-next-line
      .then(function(res: any) {
        if (res.body.message === 'Successfully deactivated user') {
          resolve(res.body.message);
        } else {
          reject(res.text);
        }
      });
  });
}

function activate(username: string, password: string): Promise<string | Error> {
  return new Promise((resolve, reject) => {
    const endpoint = 'http://localhost:8080/api/user/activate';

    var data: object = {
      body: {
        username: username,
        password: password
      },
      headers: headers,
      method: 'POST'
    };

    fetch(endpoint, data)
      // tslint:disable-next-line
      .then(function(res: any) {
        if (res.body.message === 'Successfully re-activated user') {
          resolve(res.body.message);
        } else {
          reject(res.text);
        }
      });
  });
}

function logout(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const endpoint = 'http://localhost:8080/api/logout';

    var data: object = {
      method: 'GET'
    };

    fetch(endpoint, data)
      // tslint:disable-next-line
      .then(function(res: any) {
        if (res.text === 'Successfully Logged Out') {
          resolve(res.text); // what should the result be?
        } else {
          reject(new Error('Could not log out'));
        }
      });
  });
}

/* Project */
function getProjects(): Promise<Array<Project>> {
  return new Promise((resolve, reject) => {
    const endpoint = 'http://localhost:8080/api/projects';

    var data: object = {
      body: {
        options: {
          select: { status: true }, // returns active projects
          sort: { createdAt: -1 } // returns by newest
        }
      },
      headers: headers,
      method: 'GET'
    };

    fetch(endpoint, data)
      // tslint:disable-next-line
      .then(function(res: any) {
        if (res.body.message === 'Succesfully retrieved projects') {
          resolve(res.body.projects);
        } else {
          reject(res.text);
        }
      });
  });
}

function addProject(project: Project): Promise<Project> {
  return new Promise((resolve, reject) => {
    const endpoint = 'http://localhost:8080/api/projects/add';

    var data: object = {
      body: {
        name: project.name,
        description: project.description,
        dueDate: project.dueDate,
        team: project.team,
        githubLink: project.githubLink,
        mockupLink: project.mockupLink,
        liveLink: project.liveLink,
        lookingFor: project.lookingFor,
        status: project.status,
        category: project.category,
        tags: project.tags,
        images: project.images,
        contact: project.contact,
        creator: project.creator
      },
      headers: headers,
      method: 'POST'
    };

    fetch(endpoint, data)
      // tslint:disable-next-line
      .then(function(res: any) {
        if (res.body.message === 'New project saved successfully') {
          resolve(res.body.newProject);
        } else {
          reject(res.text);
        }
      });
  });
}

/*
 * DISCUSSION: projects should probably have and use id as an unique identifier
 * currently name is being used as an unique identifier
 */
function updateProject(name: string, update: Project): Promise<Project> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      var filteredProjects = projects.filter(currentProject => {
        return currentProject.name === update.name;
      });

      if (filteredProjects.length === 0) {
        reject(new Error('Cannot update a project that does not exist.'));
      } else {
        var projectToBeUpdated = filteredProjects[0];
        var updatedObject = Object.assign(projectToBeUpdated, update);

        for (let i = 0; i < projects.length; i++) {
          if (projects[i].name === update.name) {
            projects[i] = updatedObject;
          }
        }

        resolve(updatedObject);
      }
    }, generateRandomDelay());
  });
}

function deleteProject(name: string): Promise<Project> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      var removeIndex;

      for (var i = 0; i < projects.length; i++) {
        if (projects[i].name === name) {
          removeIndex = i;
        }
      }
      if (removeIndex) {
        resolve(projects.splice(removeIndex, removeIndex)[0]);
      } else {
        reject(new Error('Project does not exist'));
      }
    }, generateRandomDelay());
  });
}

function getTags(): Promise<Array<Project>> {
  return new Promise((resolve, reject) => {
    // ajax call
    // fetch api endpoint
    // get tags
    // if successfull call, then resolve. gets passed to action.
    // if error, then reject
  });
}

function getCategories(): Promise<Array<Project>> {
  return new Promise((resolve, reject) => {
    // ajax call
    // fetch api endpoint
    // get tags
    // if successfull call, then resolve. gets passed to action.
    // if error, then reject
  });
}

/* Service Module */
var apiService = {
  login,
  register,
  deactivate,
  activate,
  logout,
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  getTags,
  getCategories
};

export default apiService;
