export interface TestProjectObject {
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

// State is used to declare any types in the this.state object 
export interface State {}

// Props is to declare any types of props passed in from parent react container
// In this case, there are no props passed in, so its an empty object
export interface Props {
    project: TestProjectObject;
}

export interface EmptyProp {}

export interface ProjectsProps {}

export interface ProjectsInheritedProps {
    count: number;
}
export interface ProjectsState {}

export let testProject = {
    name: 'Momentum Dash',
    creator: 'lilgangwolf',
    link: 'https://github.com/chingu-coders/Voyage2-Turtles-11',
    image: 'https://goo.gl/3dCcpg',
    teamMembers: ['thorbw', 'eun park', 'miles burke'],
    // tslint:disable-next-line:max-line-length
    description: 'TurtleTab is a Google Chrome Extension Built with React. It creates a new homepage which features current Weather, Todo and Notes functionality. It also accesses your browser data to see Bookmarks, enable/disable Apps and Extensions, and see/clear your History.',
    contact: 'lilgangwolf',
    lookingFor: ['Programmer', 'Designer'],
    comments: 'None',
    createdAt: 1519337864764,
    dueDate: 1519337864764,
    views: 100,
    category: 'Productivity Tool',
    status: true,
    upVotes: 10
};

export let arrayOfTestProjects = [
    testProject, testProject, testProject, testProject, testProject, testProject
];