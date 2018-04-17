import { Project } from '../types/Projects.d';
import { User } from '../types/User.d';
import { Marker } from '../types/Marker.d';

function generateRandomDelay(): number {
  return Math.floor(Math.random() * (1000 - 10 + 1)) + 10;
}

/* Mock Objects */
var users: Array<User> = [
  {
    firstName: 'Gorden',
    lastName: 'Ramsay',
    email: 'gramsy@gmail.com',
    password: 'ilovetoocook'
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
function login(email: string, password: string): Promise<User | Error> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.filter(currentUser => {
        return currentUser.email === email && currentUser.password === password;
      })[0];
      user
        ? resolve({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          })
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
      user
        ? resolve({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          })
        : reject(new Error('Email is already in use.'));
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

function addProject(project: Project): Promise<Project> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      var projectExists;

      projects.forEach(currentProject => {
        if (currentProject.name === project.name) {
          projectExists = true;
        }
      });

      if (!projectExists) {
        projects.push(project);
        resolve(project);
      } else {
        reject(new Error('Project already exists.'));
      }
    }, generateRandomDelay());
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
  register,
  logout,
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  getMarkers,
  addMarkerComment,
  saveMarker,
  updateMarkerPosition
};

export default apiService;
