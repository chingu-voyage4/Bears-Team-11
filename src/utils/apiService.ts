import { Project } from '../types/Projects.d';
import { User } from '../types/User.d';
import { Categories } from '../types/Category';
import { Tags } from '../types/Tags';

/* User */
function login(email: string, password: string): Promise<User | string> {
  return new Promise((resolve, reject) => {
    const endpoint: string = 'http://localhost:8080/api/login';

    var data: object = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
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
            _id: user._id,
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
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include',
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
            _id: user._id,
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
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include'
    };

    fetch(endpoint, data)
      // tslint:disable-next-line
      .then(function(res: any) {
        return res.json();
      })
      // tslint:disable-next-line
      .then(function(res: any) {
        JSON.stringify(res);
        if (res.message === 'User Registration Succesful') {
          var user = res.user;
          resolve({
            _id: user._id,
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
      body: JSON.stringify({
        username: username,
        password: password
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
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
      body: JSON.stringify({
        username: username,
        password: password
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
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

function userSettingsUpdate(
  aboutme: string,
  location: string,
  roles: string[],
  skills: string[],
  linkedin: string,
  github: string,
  portfolio: string,
  website: string,
  twitter: string,
  blog: string,
  userId: string
): Promise<User | Error> {
  return new Promise((resolve, reject) => {
    const endpoint = 'http://localhost:8080/api/user/update/public';
    console.log('userId=' + userId);
    var data: object = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description: aboutme,
        location: location,
        roles: roles,
        techstack: skills,
        linkedInLink: linkedin,
        githubLink: github,
        portfolioLink: portfolio,
        websiteLink: website,
        twitterLink: twitter,
        blogLink: blog,
        userId: userId
      })
    };

    fetch(endpoint, data)
      // tslint:disable-next-line
      .then(function(res: any) {
        return res.json();
      })
      // tslint:disable-next-line
      .then(function(res: any) {
        console.log('res=' + JSON.stringify(res));
        if (res.message === 'Successfully updated user details') {
          var user = res.user;
          var userDetails = res.userDetail;
          console.log('updated user=' + user);
          console.log('updated userDetails=' + userDetails);
          resolve({
            _id: user._id,
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
      headers: {
        'Content-Type': 'application/json'
      },
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
// function getProjects(
//   options: object,
//   query: object | null
// ): Promise<Array<Project>> {
//   return new Promise((resolve, reject) => {
//     var endpoint = 'http://localhost:8080/api/projects?options=' + JSON.stringify(options);

//     if (query === null) {
//       endpoint += '?query=' + JSON.stringify(query);
//     }

//     var data: object = {
//       method: 'GET'
//     };

//     console.log(data);

//     fetch(endpoint, data)
//       // tslint:disable-next-line
//       .then(function(res: any) {
//         return res.json();
//       })
//       // tslint:disable-next-line
//       .then(function(res: any) {
//         JSON.stringify(res);
//         if (res.message === 'Succesfully retrieved projects') {
//           console.log(res.projects.docs);
//           resolve(res.projects.docs);
//         } else {
//           reject(res.error);
//         }
//       });
//   });
// }
function getProjects(
  options: object,
  query: object | null
): Promise<Array<Project>> {
  return new Promise((resolve, reject) => {
    const endpoint = 'http://localhost:8080/api/projects';
    var bodyData;

    if (query === null) {
      bodyData = { options };
    } else {
      bodyData = { options, query };
    }
    var data: object = {
      body: JSON.stringify(bodyData),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    };

    console.log(data);

    fetch(endpoint, data)
      // tslint:disable-next-line
      .then(function(res: any) {
        return res.json();
      })
      // tslint:disable-next-line
      .then(function(res: any) {
        JSON.stringify(res);
        if (res.message === 'Succesfully retrieved projects') {
          console.log(res.projects.docs);
          resolve(res.projects.docs);
        } else {
          reject(res.error);
        }
      });
  });
}

function getProject(projectId: string) {
  return new Promise((resolve, reject) => {
    resolve({
      name: 'Momentum Project',
      creator: 'lilgangwolf',
      githubLink: 'https://github.com',
      mockupLink: 'https://google.com',
      liveLink: 'https://google.com',

      images: [
        // tslint:disable-next-line
        'https://images.unsplash.com/photo-1515111293107-b0cd6448f5f6?ixlib=rb-0.3.5&s=cba9fa015c2090a9c73d76dab3ed6dd0&auto=format&fit=crop&w=2700&q=80',
        // tslint:disable-next-line
        'https://images.unsplash.com/photo-1500482176473-ccba10e1e880?ixlib=rb-0.3.5&s=7c0d4e6d85c1dc526c84a070890c058c&auto=format&fit=crop&w=1534&q=80'
      ],
      mockups: ['mockupid_1', 'mockupid_2', 'mockupid_3'],
      team: ['lilgangwolf', 'natapot'],
      description:
        // tslint:disable-next-line
        'Clone of the momentum chrome eetnsion, with these following design changes: (1) adding a link to github repots, (2) ability to search and pin new weather locations. We are looking for a designer to re-work the layout based off our uploaded precedents.',
      contact: 'lilgangwolf@gmail.com',
      lookingFor: ['designer'],
      comments: [],
      createdAt: Date.now(),
      dueDate: Date.now(),
      views: 1,
      category: 'extension',
      tags: ['extension'],
      status: true,
      upVotes: 1,
      modifiedAt: Date.now()
    });
  });
}

function addProject(project: Project): Promise<Project> {
  return new Promise((resolve, reject) => {
    const endpoint = 'http://localhost:8080/api/projects/add';

    var data: object = {
      body: JSON.stringify({
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
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include'
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
        if (res.message === 'New project saved successfully') {
          resolve(res.newProject);
        } else {
          reject(res.error);
        }
      });
  });
}

function uploadProjectImage(
  file: FileList,
  projectId: string
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const endpoint =
      'http://localhost:8080/api/upload/project?projectId=' + projectId;

    var data: object = {
      body: file,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      method: 'POST',
      credentials: 'include'
    };

    fetch(endpoint, data)
      // tslint:disable-next-line
      .then(function(res: any) {
        return res.json();
      })
      // tslint:disable-next-line
      .then(function(res: any) {
        JSON.stringify(res);
        if (res.message === 'Uploaded project image successfully') {
          resolve(res.contentUrls);
        } else {
          reject(res.error);
        }
      });
  });
}

function downloadProjectImageURLS(projectId: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const endpoint =
      'http://localhost:8080/api/download/project?projectId=' + projectId;
    var data: object = {
      method: 'GET'
    };
    fetch(endpoint, data)
      .then(function(res: any) {
        return res.json();
      })
      .then(function(res: any) {
        JSON.stringify(res);
        if (res.message === 'Successfully retrieved project image URL') {
          resolve(res.urls);
        } else {
          reject(res.error);
        }
      });
  });
}
function getOneProject(id: string): Promise<Project> {
  return new Promise((resolve, reject) => {
    const endpoint = 'http://localhost:8080/api/projects/' + id;

    var data: object = {
      method: 'GET',
      credentials: 'include'
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
      body: JSON.stringify({
        id: id
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include'
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
      headers: {
        'Content-Type': 'application/json'
      },
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
      headers: {
        'Content-Type': 'application/json'
      },
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
  getProject,
  addProject,
  getOneProject,
  deleteProject,
  getTags,
  getCategories,
  getAllUsers,
  uploadProjectImage,
  downloadProjectImageURLS,
  userSettingsUpdate
};

export default apiService;
