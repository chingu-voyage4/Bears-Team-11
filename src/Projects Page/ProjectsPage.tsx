import * as React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Projects from '../Projects';
import '../styles/ProjectsPage.css';
import '../styles/Project.css';
import { PassedProps, State, Props } from '../types/ProjectsPage.d';

class ProjectsPage extends React.Component<PassedProps, State> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Header />
                <Projects count={24} />
                <Footer />
            </div>
        );
    }
}

export default ProjectsPage;