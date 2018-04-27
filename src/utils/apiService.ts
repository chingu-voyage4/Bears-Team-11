import { Project } from '../types/Projects.d';
import { User } from '../types/User.d';
import { Marker } from '../types/Marker.d';
import { Categories } from '../types/Category';
import { Tags } from '../types/Tags';
import axios from 'axios';

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
        if (res.message === 'Successfully logged in') {
          var user = res.user;
          var userDetails = res.userDetail;
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
        if (
          res.message === 'Successfully logged in with Google' ||
          res.message === 'Sucessfully registered with Google'
        ) {
          var user = res.user;
          var userDetails = res.userDetail;
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
        if (res.message === 'Successfully updated user details') {
          var user = res.user;
          var userDetails = res.userDetail;
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

function logout() {
  return axios.get('http://localhost:8080/api/logout').then(response => {
    return null;
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

    console.log(data);

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

function updateProject(project: Project): Promise<Project> {
  return new Promise((resolve, reject) => {
    const endpoint = 'http://localhost:8080/api/projects/update/' + project._id;

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
        if (res.message === 'Project saved successfully') {
          console.log(res.project);
          resolve(res.project);
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
      formData.append('image', file![i]);
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
        if (res.message === 'Successfully saved project image') {
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
      'http://localhost:8080/api/upload/image/profile?userName=' + userId;

    var formData = new FormData();
    formData.append('image', file);

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
        if (res.message === 'Successfully saved profile image') {
          var user = res.user;
          var userDetails = res.userDetail;
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

function uploadRevisionImage(
  file: FileList,
  projectId: string
): Promise<Project> {
  return new Promise((resolve, reject) => {
    const endpoint =
      'http://localhost:8080/api/upload/image/revision?revisionId=' + projectId;

    var formData = new FormData();
    for (var i = 0; i < file.length; i++) {
      formData.append('image', file![i]);
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
        if (res.message === 'Successfully saved revision image') {
          resolve(res.revision);
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
        if (res.message === 'Successfully retrieved project') {
          resolve(res.project);
        } else {
          reject(res.error);
        }
      });
  });
}

function deleteProject(id: string): Promise<Project> {
  return new Promise((resolve, reject) => {
    const endpoint = 'http://localhost:8080/api/projects/delete';

    var data: object = {
      body: JSON.stringify({
        id: id
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
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
 */
function getMarkers(revisionId: string) {
  return axios
    .get(`http://localhost:8080/api/projects/revision/${revisionId}/markers`)
    .then(response => {
      return response.data.markers;
    });
}

function saveMarker(revisionId: string, marker: Marker) {
  return axios
    .post(`http://localhost:8080/api/projects/revision/${revisionId}/marker`, {
      type: marker.type,
      creator: marker.creator,
      x: marker.x,
      y: marker.y,
      width: marker.width,
      height: marker.height
    })
    .then(response => {
      return response.data.marker;
    });
}

function updateMarkerPosition(id: string, x: string, y: string) {
  return axios
    .put(`http://localhost:8080/api/projects/revision/markers/${id}`, {
      x,
      y
    })
    .then(response => {
      return response.data.marker;
    });
}

function updateMarkerDimensions(id: string, width: string, height: string) {
  return axios
    .put(`http://localhost:8080/api/projects/revision/markers/${id}`, {
      width,
      height
    })
    .then(response => {
      return response.data.marker;
    });
}

function getMarkerComments(markerId: string) {
  return axios
    .get(
      `http://localhost:8080/api/projects/revision/markers/${markerId}/comments`
    )
    .then(response => {
      return response.data.comments;
    });
}

function addMarkerComment(
  revisionId: string,
  markerId: string,
  comment: { user: string; time: string; message: string }
) {
  return axios
    .post(
      `http://localhost:8080/api/projects/revision/marker/${markerId}/comment`,
      {
        creator: comment.user,
        comment: comment.message
      }
    )
    .then(response => {
      return response.data.comment;
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
  getMarkerComments,
  addMarkerComment,
  saveMarker,
  updateMarkerPosition,
  updateMarkerDimensions,
  getOneProject,
  deleteProject,
  getTags,
  getCategories,
  getAllUsers,
  uploadProjectImage,
  uploadProfileImage,
  downloadProjectImageURLS,
  userSettingsUpdate,
  updateProject,
  uploadRevisionImage
};

export default apiService;
