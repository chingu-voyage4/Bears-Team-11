import * as React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Projects from '../Projects';
import ProjectsFilter from './ProjectsFilter';
import '../styles/ProjectsPage.css';
import '../styles/Project.css';
import { PassedProps, State, Props } from '../types/ProjectsPage.d';
// import { connect } from 'react-redux';
class ProjectsPage extends React.Component<PassedProps, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            searchTerm: '',
        };
    }

    public onFormChange(e: React.FormEvent<HTMLButtonElement>): void {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        });
    }

    render() {
        return (
            <div>
                <Header />
                <div className="projects-header-text">
                    Explore Projects
                </div>

                <form className="projects-search-form">
                    <input className="projects-search-box" type="search" placeholder="Search for Projects" />
                    <button className="projects-search-btn" type="submit">Search</button>
                </form>

                <ProjectsFilter />
                
                <Projects count={24} />

                <br />

                <Footer />
            </div>
        );
    }
}

// const mapStateToProps = (state: State) => {
//     return {
//         projects: state.projects
//     }
// }

// const mapDispatchToProps = (dispatch: Dispatch) => {
//     return {
//         searchProjects: () => dispatch({
//             type: 'SEARCH_PROJECTS'
//         })
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPage);
export default ProjectsPage;