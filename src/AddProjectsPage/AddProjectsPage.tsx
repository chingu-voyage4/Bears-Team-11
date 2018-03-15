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
    var { name, value } = e.currentTarget;
    /*
     * There is a current bug in typescript that does not correctly identify the string literal
     * type in a computed property key.
     * 
     * ref: https://github.com/Microsoft/TypeScript/issues/15534
     * ref: https://github.com/Microsoft/TypeScript/issues/13948
     * ref: https://github.com/Microsoft/TypeScript/pull/21070
     */
    this.setState({
      [name]: value
      // tslint:disable-next-line
    } as any);
  }

  handleSubmit = (e: React.FormEvent<HTMLButtonElement>): void => {
    // this.props.addProject(this.state.email, this.state.password);
  };

  toggleCategoryDropdown = (e: React.FormEvent<HTMLButtonElement>): void => {
    // toggle show/hide of category dropdown
    var doc = document.getElementById('new-project-dropdown')!;
    doc.classList.toggle('new-project-show');
  };

  render() {
    return (
      <div>
        <Header />
        <form className="new-project-container">
          <div className="box-1">
            <div className="box-1-a">
              <label className="newProjectSubText" htmlFor="new-project-title">
                Project Title
              </label>
              <input
                type="text"
                name="name"
                id="new-project-title"
                className="new-project-input"
                onChange={e => this.onFormChange(e)}
              />

              <label
                className="newProjectSubText"
                htmlFor="new-project-description"
              >
                Description
              </label>
              <input
                type="text"
                name="description"
                id="new-project-description"
                className="new-project-input"
                onChange={e => this.onFormChange(e)}
              />

              <label
                className="newProjectSubText"
                htmlFor="new-project-dueDate"
              >
                Due Date
              </label>
              <input
                type="text"
                name="dueDate"
                id="new-project-dueDate"
                className="new-project-input"
                onChange={e => this.onFormChange(e)}
              />

              <label className="newProjectSubText" htmlFor="new-project-team">
                Team
              </label>
              <input
                type="text"
                name="team"
                id="new-project-team"
                className="new-project-input"
                onChange={e => this.onFormChange(e)}
              />
            </div>{' '}
            {/* end of box 1 A */}
            <div className="box-1-b">
              <label
                className="newProjectSubText"
                htmlFor="new-project-githubLink"
              >
                Github Link
              </label>
              <input
                type="text"
                name="githubLink"
                id="new-project-githubLink"
                className="new-project-input"
                onChange={e => this.onFormChange(e)}
              />

              <label
                className="newProjectSubText"
                htmlFor="new-project-mockupLink"
              >
                Mockup Link
              </label>
              <input
                type="text"
                name="mockupLink"
                id="new-project-mockupLink"
                className="new-project-input"
                onChange={e => this.onFormChange(e)}
              />

              <label
                className="newProjectSubText"
                htmlFor="new-project-liveLink"
              >
                Live Link
              </label>
              <input
                type="text"
                name="liveLink"
                id="new-project-liveLink"
                className="new-project-input"
                onChange={e => this.onFormChange(e)}
              />
            </div>{' '}
            {/* end of box 1 B */}
          </div>{' '}
          {/* end of box 1 */}
          <div className="box-2">
            <label
              className="newProjectSubText"
              htmlFor="new-project-lookingFor"
            >
              Looking For
            </label>
            <div className="new-project-lookingFor">
              <div className="checkbox">
                <input
                  type="checkbox"
                  name="roles"
                  value="Programmer"
                  id="new-project-role-p"
                  onChange={e => this.onFormChange(e)}
                />
                <label
                  className="new-project-text"
                  htmlFor="new-project-role-p"
                >
                  Programmer
                </label>
              </div>

              <div className="checkbox">
                <input
                  type="checkbox"
                  name="roles"
                  value="Designer"
                  id="new-project-role-d"
                  onChange={e => this.onFormChange(e)}
                />
                <label
                  className="new-project-text"
                  htmlFor="new-project-role-d"
                >
                  Designer
                </label>
              </div>
            </div>

            <div className="new-project-category">
              <label
                className="newProjectSubText"
                htmlFor="new-project-dropdown"
              >
                Category
              </label>
              <button
                onClick={this.toggleCategoryDropdown}
                className="new-project-dropdown-btn"
              >
                Choose A Category
              </button>
              <div
                id="new-project-dropdown"
                className="new-project-category-content"
              >
                <a href="#" className="new-project-dropdown-text">
                  Design Tools
                </a>
                <a href="#" className="new-project-dropdown-text">
                  Developer Tools
                </a>
                <a href="#" className="new-project-dropdown-text">
                  Fun
                </a>
                <a href="#" className="new-project-dropdown-text">
                  News & Weather
                </a>
                <a href="#" className="new-project-dropdown-text">
                  Productivity
                </a>
                <a href="#" className="new-project-dropdown-text">
                  Search Tools
                </a>
                <a href="#" className="new-project-dropdown-text">
                  Shopping
                </a>
                <a href="#" className="new-project-dropdown-text">
                  Social & Communication{' '}
                </a>
                <a href="#" className="new-project-dropdown-text">
                  Sports
                </a>
              </div>
            </div>
          </div>
          {/* end of box 2 */}
        </form>
        <Footer />
      </div>
    );
  }
}

export default AddProjectsPage;
