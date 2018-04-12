import { Project } from '../types/Projects.d';
import { User } from '../types/User.d';
import { Categories } from '../types/Category';
import { Tags } from '../types/Tags';

var headers = {
  'Content-Type': 'application/json'
};

/* User */
function login(email: string, password: string): Promise<User | string> {
  return new Promise((resolve, reject) => {
    const endpoint: string = 'http://localhost:8080/api/login';

    var data: object = {
      headers: headers,
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({
        email: email,
        password: password
      })
    };

    fetch(endpoint, data)
      // tslint:disable-next-line
      .then(function(res: any) {
        return res.json();
      })
      // tslint:disable-next-line
      .then(function(res: any) {
        JSON.stringify(res);
        console.log(res);
        if (res.message === 'Successfully logged in') {
          var user = res.user;
          var userDetails = res.userDetail;
          console.log('user=' + user);
          console.log('userDetails=' + userDetails);
          resolve({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            profileImage: user.profileImage,
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
          reject(res.error);
        }
      });
  });
}

function googleLogin(idToken: string): Promise<User | Error> {
  return new Promise((resolve, reject) => {
    const endpoint: string = 'http://localhost:8080/api/googlelogin';

    var data: object = {
      headers: headers,
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({
        idToken: idToken
      })
    };

    fetch(endpoint, data)
      // tslint:disable-next-line
      .then(function(res: any) {
        return res.json();
      })
      // tslint:disable-next-line
      .then(function(res: any) {
        JSON.stringify(res);
        console.log(res);
        if (
          res.message === 'Successfully logged in with Google' ||
          res.message === 'Sucessfully registered with Google'
        ) {
          var user = res.user;
          var userDetails = res.userDetail;
          console.log('user=' + user);
          console.log('userDetails=' + userDetails);
          resolve({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            profileImage: user.profileImage,
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
          reject(res.error);
        }
      });
  });
}

function register(
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string
): Promise<User | Error> {
  return new Promise((resolve, reject) => {
    const endpoint = 'http://localhost:8080/api/signup';

    var data: object = {
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        username: username
      }),
      headers: headers,
      method: 'POST',
      credentials: 'same-origin'
    };

    fetch(endpoint, data)
      // tslint:disable-next-line
      .then(function(res: any) {
        return res.json();
      })
      // tslint:disable-next-line
      .then(function(res: any) {
        JSON.stringify(res);
        // console.log('JSON.stringify=' + JSON.stringify(res));
        if (res.message === 'User Registration Succesful') {
          var user = res.user;
          resolve({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username
          });
        } else {
          reject(res.error);
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
        return res.json();
      })
      // tslint:disable-next-line
      .then(function(res: any) {
        JSON.stringify(res);
        if (res.message === 'Successfully deactivated user') {
          resolve(res.message);
        } else {
          reject(res.error);
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
        return res.json();
      })
      // tslint:disable-next-line
      .then(function(res: any) {
        JSON.stringify(res);
        if (res.message === 'Successfully re-activated user') {
          resolve(res.message);
        } else {
          reject(res.error);
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
        return res.json();
      })
      // tslint:disable-next-line
      .then(function(res: any) {
        JSON.stringify(res);
        if (res.text === 'Successfully Logged Out') {
          resolve(res.text); // what should the result be?
        } else {
          reject(res.error);
        }
      });
  });
}

function getAllUsers(): Promise<Array<User>> {
  return new Promise((resolve, reject) => {
    const endpoint = 'http://localhost:8080/api/users';

    var data: object = {
      headers: headers,
      method: 'GET'
    };

    fetch(endpoint, data)
      // tslint:disable-next-line
      .then(function(res: any) {
        return res.json();
      })
      // tslint:disable-next-line
      .then(function(res: any) {
        JSON.stringify(res);
        if (res.message === 'Successfully retrieved all users') {
          resolve(res.users);
        } else {
          reject(res.error);
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
        return res.json();
      })
      // tslint:disable-next-line
      .then(function(res: any) {
        JSON.stringify(res);
        if (res.message === 'Succesfully retrieved projects') {
          resolve(res.projects);
        } else {
          reject(res.error);
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
        return res.json();
      })
      // tslint:disable-next-line
      .then(function(res: any) {
        JSON.stringify(res);
        if (res.message === 'New project saved successfully') {
          resolve(res.newProject);
        } else {
          reject(res.error);
        }
      });
  });
}

function updateProject(
  name: string,
  update: string,
  id: string
): Promise<Project> {
  return new Promise((resolve, reject) => {
    const endpoint = 'http://localhost:8080/api/projects/update';

    var data: object = {
      body: {
        id: id,
        updateKey: name,
        updateObject: update
      },
      headers: headers,
      method: 'POST'
    };

    fetch(endpoint, data)
      // tslint:disable-next-line
      .then(function(res: any) {
        return res.json();
      })
      // tslint:disable-next-line
      .then(function(res: any) {
        JSON.stringify(res);
        if (res.message === 'Successfully updated project') {
          resolve(res.project);
        } else {
          reject(res.error);
        }
      });
  });
}

function deleteProject(id: string): Promise<Project> {
  return new Promise((resolve, reject) => {
    const endpoint = 'http://localhost:8080/api/projects/delete/one';

    var data: object = {
      body: {
        id: id
      },
      headers: headers,
      method: 'POST'
    };

    fetch(endpoint, data)
      // tslint:disable-next-line
      .then(function(res: any) {
        return res.json();
      })
      // tslint:disable-next-line
      .then(function(res: any) {
        JSON.stringify(res);
        if (res.message === 'Project successfully deleted') {
          resolve(res.project);
        } else {
          reject(res.error);
        }
      });
  });
}

function getTags(): Promise<Tags> {
  console.log('getting tags');
  return new Promise((resolve, reject) => {
    const endpoint = 'http://localhost:8080/api/projects/tags';

    var data: object = {
      headers: headers,
      method: 'GET'
    };

    fetch(endpoint, data)
      // tslint:disable-next-line
      .then(function(res: any) {
        return res.json();
      })
      // tslint:disable-next-line
      .then(function(res: any) {
        JSON.stringify(res);
        if (res.message === 'Successfully retrieved tags') {
          resolve(res.tags);
        } else {
          reject(res.error);
        }
      });
  });
}

function getCategories(): Promise<Categories> {
  return new Promise((resolve, reject) => {
    const endpoint = 'http://localhost:8080/api/projects/categories';

    var data: object = {
      headers: headers,
      method: 'GET'
    };

    fetch(endpoint, data)
      // tslint:disable-next-line
      .then(function(res: any) {
        return res.json();
      })
      // tslint:disable-next-line
      .then(function(res: any) {
        JSON.stringify(res);
        if (res.message === 'Successfully retrieved categories') {
          resolve(res.categories);
        } else {
          reject(res.error);
        }
      });
  });
}

/* Service Module */
var apiService = {
  login,
  googleLogin,
  register,
  deactivate,
  activate,
  logout,
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  getTags,
  getCategories,
  getAllUsers
};

export default apiService;
