import * as React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import '../styles/AddProjectsPage.css';
import { PassedProps, State, Props } from '../types/AddProjectsPage.d';

class AddProjectsPage extends React.Component<PassedProps, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      dueDate: '',
      team: [],
      githubLink: '',
      mockupLink: '',
      publishedSiteLink: '',
      lookingFor: [],
      status: '',
      category: '',
      tags: []
    };
  }

  public onFormChange(e: React.FormEvent<HTMLInputElement>): void {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  }

  render() {
    return (
      <div>
        <Header />
        <form className="new-project-container">
          <input
            type="text"
            name="title"
            id="new-project-title"
            onChange={e => this.onFormChange(e)}
          />
          <label className="newProjectSubText" htmlFor="new-project-title">Title</label>

          <input
            type="text"
            name="description"
            id="new-project-description"
            onChange={e => this.onFormChange(e)}
          />
          <label className="newProjectSubText" htmlFor="new-project-description">Description</label>

          <input
            type="text"
            name="dueDate"
            id="new-project-dueDate"
            onChange={e => this.onFormChange(e)}
          />
          <label className="newProjectSubText" htmlFor="new-project-dueDate">Due Date</label>

          <input
            type="text"
            name="team"
            id="new-project-team"
            onChange={e => this.onFormChange(e)}
          />
          <label className="newProjectSubText" htmlFor="new-project-team">Team</label>

          <input
            type="text"
            name="githubLink"
            id="new-project-githubLink"
            onChange={e => this.onFormChange(e)}
          />
          <label className="newProjectSubText" htmlFor="new-project-githubLink">Github Link</label>

        </form>
        <Footer />
      </div>
    );
  }
}

export default AddProjectsPage;