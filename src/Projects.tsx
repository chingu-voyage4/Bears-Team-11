import * as React from 'react';
import './styles/RecentProjects.css';
import { TestProjectObject, State, Props, testProject } from './types/Projects';

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