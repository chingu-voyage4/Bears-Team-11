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
      creator: '',
      categoryPlaceholder: 'Choose A Category'
    };
  }

  toggleCategoryDropdown = (e: React.FormEvent<HTMLButtonElement>): void => {
    // toggle show/hide of category dropdown
    e.preventDefault();
    var doc = document.getElementById('new-project-dropdown')!;
    doc.classList.toggle('new-project-show');
  };

  public onFormChange = (e: React.FormEvent<HTMLInputElement>): void => {
    var { name, value } = e.currentTarget;
    /*
     * There is a current bug in typescript that does not correctly identify the string literal
     * type in a computed property key.
     * 
     * ref: https://github.com/Microsoft/TypeScript/issues/15534
     * ref: https://github.com/Microsoft/TypeScript/issues/13948
     * ref: https://github.com/Microsoft/TypeScript/pull/21070
     */
    if (name === 'category') {
      // tslint:disable-next-line
      this.setState({ categoryPlaceholder: value } as any);
      this.toggleCategoryDropdown(e);
    } else {
      this.setState({
        [name]: value
        // tslint:disable-next-line
      } as any);
    }
  };

  public onTextAreaFormChange(e: React.FormEvent<HTMLTextAreaElement>): void {
    var { name, value } = e.currentTarget;
    this.setState({
      [name]: value
      // tslint:disable-next-line
    } as any);
  }

  handleSubmit = (e: React.FormEvent<HTMLButtonElement>): void => {
    // this.props.addProject(this.state.email, this.state.password);
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
              <textarea
                name="description"
                id="new-project-description"
                className="new-project-textarea"
                onChange={e => this.onTextAreaFormChange(e)}
              />

              <label
                className="newProjectSubText"
                htmlFor="new-project-dueDate"
              >
                Due Date
              </label>
              <input
                type="date"
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
                {this.state.categoryPlaceholder}
              </button>
              <div
                id="new-project-dropdown"
                className="new-project-category-content"
              >
                <input
                  type="button"
                  name="category"
                  value="Design Tools"
                  onClick={this.onFormChange}
                  className="new-project-dropdown-text"
                />
                <input
                  type="button"
                  name="category"
                  value="Developer Tools"
                  onClick={this.onFormChange}
                  className="new-project-dropdown-text"
                />
                <input
                  type="button"
                  name="category"
                  value="Fun"
                  onClick={this.onFormChange}
                  className="new-project-dropdown-text"
                />
                <input
                  type="button"
                  name="category"
                  value="News & Weather"
                  onClick={this.onFormChange}
                  className="new-project-dropdown-text"
                />
                <input
                  type="button"
                  name="category"
                  value="Producitivity"
                  onClick={this.onFormChange}
                  className="new-project-dropdown-text"
                />
                <input
                  type="button"
                  name="category"
                  value="Search Tools"
                  onClick={this.onFormChange}
                  className="new-project-dropdown-text"
                />
                <input
                  type="button"
                  name="category"
                  value="Shopping"
                  onClick={this.onFormChange}
                  className="new-project-dropdown-text"
                />
                <input
                  type="button"
                  name="category"
                  value="Social & Communication"
                  onClick={this.onFormChange}
                  className="new-project-dropdown-text"
                />
                <input
                  type="button"
                  name="category"
                  value="Sports"
                  onClick={this.onFormChange}
                  className="new-project-dropdown-text"
                />
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
