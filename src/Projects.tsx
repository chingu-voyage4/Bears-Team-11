import * as React from 'react';
import './styles/RecentProjects.css';

interface TestProjectObject {
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

interface State {
    project: TestProjectObject;
}

interface Props {}
/* tslint-disable */
let testProject = {
    name: 'Momentum Dash',
    creator: 'lilgangwolf',
    link: 'https://github.com/chingu-coders/Voyage2-Turtles-11',
    image: 'https://goo.gl/3dCcpg',
    teamMembers: ['thorbw', 'eun park', 'miles burke'],
    description: 'TurtleTab is a Google Chrome Extension Built with React.',
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
/* tslint-enable */

class Projects extends React.Component<Props, State> {
    constructor(props: TestProjectObject) {
        super(props);
        this.state = {
            project: testProject
        };
    }
    render() {
        return (
            <div className="project">
                <img className="project-image" alt={this.state.project.name} src={this.state.project.image} />
                <div className="project-info">
                    <div className="project-name">{this.state.project.name}</div>
                    <div className="project-description">{this.state.project.description}</div>
                    <div className="project-roles-needed">{this.state.project.lookingFor}</div>
                    <img className="project-save" src={require('./assets/Bookmark Icon.png')} />
                </div>
            </div>
        );
    }
}

export default Projects;