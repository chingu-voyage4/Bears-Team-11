import * as React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import '../styles/AddProjectsPage.css';
import { PassedProps, State, Props } from '../types/AddProjectsPage.d';

class AddProjectsPage extends React.Component<PassedProps, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      dueDate: '',
      team: [],
      githubLink: '',
      mockupLink: '',
      liveLink: '',
      lookingFor: [],
      status: '',
      category: '',
      tags: [],
      images: [],
      contact: '',
      creator: ''
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
          <div className="box-1">
            <div className="box-1-a">
              <label className="newProjectSubText" htmlFor="new-project-title">Project Title</label>
              <input
                type="text"
                name="name"
                id="new-project-title"
                className="new-project-input"
                onChange={e => this.onFormChange(e)}
              />

              <label className="newProjectSubText" htmlFor="new-project-description">Description</label>
              <input
                type="text"
                name="description"
                id="new-project-description"
                className="new-project-input"
                onChange={e => this.onFormChange(e)}
              />

              <label className="newProjectSubText" htmlFor="new-project-dueDate">Due Date</label>
              <input
                type="text"
                name="dueDate"
                id="new-project-dueDate"
                className="new-project-input"
                onChange={e => this.onFormChange(e)}
              />

              <label className="newProjectSubText" htmlFor="new-project-team">Team</label>
              <input
                type="text"
                name="team"
                id="new-project-team"
                className="new-project-input"
                onChange={e => this.onFormChange(e)}
              />
            </div> {/* end of box 1 A */}
            <div className="box-1-B">
              <label className="newProjectSubText" htmlFor="new-project-githubLink">Github Link</label>
              <input
                type="text"
                name="githubLink"
                id="new-project-githubLink"
                className="new-project-input"
                onChange={e => this.onFormChange(e)}
              />

              <label className="newProjectSubText" htmlFor="new-project-mockupLink">Mockup Link</label>
              <input
                type="text"
                name="mockupLink"
                id="new-project-mockupLink"
                className="new-project-input"
                onChange={e => this.onFormChange(e)}
              />

              <label className="newProjectSubText" htmlFor="new-project-liveLink">Live Link</label>
              <input
                type="text"
                name="liveLink"
                id="new-project-liveLink"
                className="new-project-input"
                onChange={e => this.onFormChange(e)}
              />
            </div> {/* end of box 1 B */}
          </div> {/* end of box 1 */}
          <div className="box-2">
            <label className="newProjectSubText" htmlFor="new-project-lookingFor">Looking For</label>
            <div className="new-project-lookingFor">
              <div className="checkbox">
                <input
                  type="checkbox"
                  name="roles"
                  value="Programmer"
                  id="new-project-role-p"
                  onChange={e => this.onFormChange(e)}
                />
                <label htmlFor="new-project-role-p">Programmer</label>
              </div>

              <div className="checkbox">
                <input
                  type="checkbox"
                  name="roles"
                  value="Designer"
                  id="new-project-role-d"
                  onChange={e => this.onFormChange(e)}
                />
                <label htmlFor="new-project-role-d">Designer</label>
              </div>
            </div>

          </div> {/* end of box 2 */}
        </form>
        <Footer />
      </div>
    );
  }
}

export default AddProjectsPage;