import { Project } from '../types/Projects.d';
import { User } from '../types/User.d';
import { Marker } from '../types/Marker.d';
import { Categories } from '../types/Category';
import { Tags } from '../types/Tags';
import axios from 'axios';

function generateRandomDelay(): number {
  return Math.floor(Math.random() * (1000 - 10 + 1)) + 10;
}

/* Mock Objects */
var markers: Array<Marker> = [
  {
    id: 'lilgangwolf-1',
    type: 'circle',
    comments: [
      {
        user: 'natapot',
        time: '8:00am',
        message: 'Dislike Kaiju, please make more cool.'
      },
      {
        user: 'natapot',
        time: '8:00am',
        message: 'Dislike Kaiju, please make more cool.'
      },
      {
        user: 'natapot',
        time: '8:00am',
        message: 'Dislike Kaiju, please make more cool.'
      }
    ],
    creator: 'lilgangwolf',
    x: '416',
    y: '77'
  },
  {
    id: 'lilgangwolf-2',
    type: 'circle',
    comments: [
      {
        user: 'natapot',
        time: '8:00am',
        message: 'Dislike Kaiju, please make more cool.'
      },
      {
        user: 'natapot',
        time: '8:00am',
        message: 'Dislike Kaiju, please make more cool.'
      },
      {
        user: 'natapot',
        time: '8:00am',
        message: 'Dislike Kaiju, please make more cool.'
      }
    ],
    creator: 'lilgangwolf',
    x: '717',
    y: '223'
  },
  {
    id: 'lilgangwolf-3',
    type: 'rectangle',
    creator: 'lilgangwolf',
    comments: [
      {
        user: 'natapot',
        time: '8:00am',
        message: 'Dislike Kaiju, please make more cool.'
      },
      {
        user: 'natapot',
        time: '8:00am',
        message: 'Dislike Kaiju, please make more cool.'
      },
      {
        user: 'natapot',
        time: '8:00am',
        message: 'Dislike Kaiju, please make more cool.'
      }
    ],
    x: '1019',
    y: '398',
    width: '100',
    height: '200'
  }
];

var revisions = { '9a7e6f2b-89f6-46e8-8e15-e775adc59124': markers };

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
  return axios
    .get('http://localhost:8080/api/projects/' + projectId)
    .then(response => response.data.project);
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
): Promise<Project> {
  return new Promise((resolve, reject) => {
    const endpoint =
      'http://localhost:8080/api/upload/image/project?projectId=' + projectId;

    var formData = new FormData();
    for (var i = 0; i < file.length; i++) {
      console.log(file[i]);
      formData.append('projectImages', file[i]);
    }

    var data: object = {
      body: formData,
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
        if (
          res.message ===
          'Successfully uploaded and saved project image URL to project'
        ) {
          console.log(res.project);
          resolve(res.project);
        } else {
          reject(res.error);
        }
      });
  });
}

function uploadProfileImage(file: File, userId: string): Promise<User> {
  return new Promise((resolve, reject) => {
    const endpoint =
      'http://localhost:8080/api/upload/image/profile?userId=' + userId;

    var formData = new FormData();
    formData.append('projectImages', file);

    var data: object = {
      body: formData,
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
        if (
          res.message ===
          'Successfully uploaded and saved profile image URL to project'
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

/*
 * Annotations
 *
 * Will need the revision ID as a set of markers belongs to a particiular revision
 * POC with only 1 revision
 * 
 */
function getMarkers(revisionId: string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(revisions[revisionId]);
    }, generateRandomDelay());
  });
}

function saveMarker(revisionId: string, marker: Marker) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      revisions[revisionId].push(marker);
      resolve(marker);
    }, generateRandomDelay());
  });
}

function updateMarkerPosition(
  revisionId: string,
  id: string,
  x: string,
  y: string,
  width: string,
  height: string
) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      var updatedMarker;
      revisions[revisionId].forEach((marker: Marker) => {
        if (marker.id === id) {
          marker.x = x;
          marker.y = y;
          marker.width = width;
          marker.height = height;
          updatedMarker = marker;
        }
      });
      resolve(updatedMarker);
    }, generateRandomDelay());
  });
}

function addMarkerComment(
  revisionId: string,
  markerId: string,
  comment: { user: string; time: string; message: string }
) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      var updatedMarker;
      revisions[revisionId].forEach((marker: Marker) => {
        if (marker.id === markerId) {
          marker.comments.push(comment);
          updatedMarker = marker;
        }
      });
      resolve(updatedMarker);
    }, generateRandomDelay());
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
  getMarkers,
  addMarkerComment,
  saveMarker,
  updateMarkerPosition,
  getOneProject,
  deleteProject,
  getTags,
  getCategories,
  getAllUsers,
  uploadProjectImage,
  uploadProfileImage,
  downloadProjectImageURLS,
  userSettingsUpdate
};

export default apiService;
